import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import BillContext from "../../Contexts/Bill/BillContext";
import { IoAddCircle } from "react-icons/io5";
import BillServices, {
  Bill,
  BillItem,
  BillService,
} from "../../services/Billing/bill-page-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import useEmployee from "../../hooks/Registration/useEmployee";
import useItems from "../../hooks/Inventory/useItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import BillAddPayment from "../BillPayments/BillAddPayment";
import calculateSubTotal from "./BillCalculation";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [createdBill, setCreatedBill] = useState<Bill>({} as Bill);
  const [isCreatedBill, setIsCreatedBill] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number[]>(
    []
  );
  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();

  const { customers } = useCustomer();
  const { services } = useService();
  const { employees } = useEmployee();
  const { stockItems, setStockItems } = useContext(StockItemContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Bill>();
  const [seletedItemCountList, setSeletedItemCountList] = useState<number[]>(
    []
  );

  const paymentMethods = [
    ["Cash", "cash"],
    ["Cheque", "cheque"],
    ["Credit Card", "credit_card"],
    ["Credit", "credit"],
    ["Multiple Option", "multiple"],
  ];

  const {
    fields: itemsArray,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    name: "bill_items",
    control,
  });

  const {
    fields: serviceArray,
    append: serviceAppend,
    remove: serviceRemove,
  } = useFieldArray({
    name: "bill_services",
    control,
  });

  const onSubmit = (data: Bill) => {
    const { total, discount } = calculateSubTotal(data, services);
    setDiscount(discount);
    setSubTotal(total);

    const newly = { ...data, sub_total: total, discount_amount: discount };
    console.log("new ", newly);

    BillServices.create<Bill>(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setBills([res.data, ...bills]);
        setCreatedBill(res.data);
        setIsCreatedBill(true);
      })
      .catch((err) => setErrorBillCreate(err.message));
  };
  return (
    <>
      {errorBillCreate && <Text textColor="#dd0939">{errorBillCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-75 ">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-25">
            <Input
              {...register("invoice_id", {
                required: "Bill number is required.",
              })}
              type="text"
              placeholder="Bill No"
            />
            <Text textColor="red.600">{errors.invoice_id?.message}</Text>
          </div>

          <div className="mb-3 w-25">
            <Select {...register("customer")} className="select p-2">
              <option>Select Customer</option>
              {customers.map((customer, index) => (
                <option className="mt-3" key={index} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Add Items */}
          <div className="mb-3">
            {itemsArray.map((field, index) => (
              <Flex>
                <Flex>
                  <Select
                    {...register(`bill_items.${index}.item`)}
                    className="select w-100 p-2"
                    marginRight={10}
                    onChange={(event) => {
                      setSelectedItem(event.target.value);
                    }}
                  >
                    <option value="">Select Item</option>
                    {items.map((item, index) => (
                      <option key={index} value={item.item_id}>
                        {item.item_id}
                      </option>
                    ))}
                  </Select>
                  <Select
                    width="30vw"
                    {...register(`bill_items.${index}.stock_item`)}
                    className="select w-100 p-2"
                    onChange={(e) => {
                      const count = stockItems.find(
                        (item) => item.id === parseInt(e.target.value)
                      )?.qty;
                      if (count)
                        setSeletedItemCountList([
                          ...seletedItemCountList,
                          count,
                        ]);
                    }}
                  >
                    <option>Stock Item</option>
                    {stockItems
                      .filter((item) => item.item === selectedItem)
                      .map((stockItem, index) => (
                        <option
                          key={index}
                          value={stockItem.id}
                          className="w-100"
                        >
                          <div className="d-flex justify-content-between w-100 ">
                            <Text>{stockItem.item}</Text>
                            <Text>({stockItem.qty})</Text>
                          </div>
                        </option>
                      ))}
                  </Select>
                </Flex>
                <Flex>
                  <Flex flexDir="column" width="40vw">
                    <Input
                      type="number"
                      {...register(`bill_items.${index}.qty`, {
                        validate: (fieldValue) => {
                          if (seletedItemCountList)
                            return (
                              fieldValue <= seletedItemCountList[index] ||
                              "Item counts not valid"
                            );
                        },
                      })}
                      placeholder="QTY"
                    />
                    <Text textColor="red.600">
                      {errors.bill_items &&
                        errors.bill_items[index]?.qty?.message}
                    </Text>
                  </Flex>

                  <Input
                    type="number"
                    {...register(`bill_items.${index}.customer_discount`)}
                    placeholder="Customer Discount"
                  />
                  <Input
                    type="number"
                    {...register(`bill_items.${index}.customer_price`)}
                    placeholder="Customer Price"
                  />
                </Flex>

                <Flex>
                  <Button
                    bg="#f87454"
                    padding={2.5}
                    type="button"
                    onClick={() => {
                      console.log("valuse", seletedItemCountList);

                      itemRemove(index);
                      console.log("index", index);
                      setSeletedItemCountList(
                        seletedItemCountList.filter((val, ind) => index !== ind)
                      );

                      console.log("value updated", seletedItemCountList);
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}

            <Flex alignItems="center">
              <Button
                type="button"
                onClick={() => {
                  itemAppend({} as BillItem);
                  setSeletedItemCountList(seletedItemCountList);
                  console.log(seletedItemCountList);
                }}
              >
                Add Item
              </Button>
              <IoAddCircle />
            </Flex>
          </div>

          {/* Add Services */}
          <div className="mb-3">
            {serviceArray.map((field, index) => (
              <Flex>
                <Flex>
                  <Select
                    {...register(`bill_services.${index}.service`)}
                    className="select p-2"
                    onChange={(e) =>
                      setSelectedServiceIndex([
                        ...selectedServiceIndex,
                        parseInt(e.target.value),
                      ])
                    }
                  >
                    <option>Select Service</option>
                    {services.map((service, index) => (
                      <option className="mt-3" key={index} value={service.id}>
                        {service.description}
                      </option>
                    ))}
                  </Select>

                  <Input
                    value={
                      services.find(
                        (ser) => ser.id === selectedServiceIndex[index]
                      )?.service_value
                    }
                    placeholder="Price"
                  />

                  <Select
                    {...register(`bill_services.${index}.employee`)}
                    className="select p-2"
                  >
                    <option>Select Employee</option>
                    {employees.map((employee, index) => (
                      <option className="mt-3" key={index} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex>
                  {index > 0 && (
                    <Button
                      bg="#f87454"
                      padding={2.5}
                      type="button"
                      onClick={() => serviceRemove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))}
            <Flex alignItems="center">
              <Button
                type="button"
                onClick={() => serviceAppend({} as BillService)}
              >
                Add Service
              </Button>
              <IoAddCircle />
            </Flex>
          </div>

          <div className="mb-3 w-25">
            <Input
              {...register("custome_item_value")}
              type="text"
              placeholder="Customer Item Value"
            />
          </div>
        </div>
        <TableContainer width='40vw'>
          <Table>
            {discount !== 0 && (
              <Tr>
                <Th>Total Discount</Th>
                <Td>{discount}</Td>
              </Tr>
            )}
            {subTotal !== 0 && (
              <Tr>
                <Th>Sub Total</Th>
                <Td>{subTotal}</Td>
              </Tr>
            )}
          </Table>
        </TableContainer>

        <HStack>
          <Button
            width="10vw"
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorBillCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
          
          <Button
            width="10vw"
            type="submit"
            isDisabled={isCreatedBill}
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorBillCreate("");
              setSuccess("");
              window.location.reload();
            }}
          >
            Without Payments
          </Button>
        </HStack>
      </form>
      {isCreatedBill && <BillAddPayment createdBill={createdBill} />}
    </>
  );
};

export default BillAddForm;
