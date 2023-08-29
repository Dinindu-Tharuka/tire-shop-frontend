import { Button, HStack, Input, Text, useColorMode,FormLabel, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import StockItemService, {
  StockItem,
} from "../../services/Stock/stock-item-service";
import StockItemContext from "../../Contexts/Stock/StockItemContext";

interface Props {
  selectedStockItem: StockItem;
}

const UpdateStockItemForm = ({ selectedStockItem }: Props) => {
  const { register, handleSubmit } = useForm<StockItem>();

  const [errorStockItemUpdate, setErrorStockItemUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { setStockItems, stockItems } = useContext(StockItemContext);

  const onUpdate = (data: StockItem) => {

    const newly = { ...data, stock_item_invoice:selectedStockItem.stock_item_invoice}

    
    
    StockItemService.update(newly, `${selectedStockItem.id}`)
      .then((res) => {
        setSuccess(res.status === 200 ? "Updated Successfully" : "");
        stockItems.map((item) =>
          item.id === selectedStockItem.id ? res.data : item
        );
      })
      .catch((err) => setErrorStockItemUpdate(err.message));
  };
  return (
    <>
      {errorStockItemUpdate && (
        <Text textColor="#dd0939">{errorStockItemUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onUpdate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75 d-flex justify-content-between">            
            <FormLabel> Item </FormLabel>
            <Input
              {...register("item")}
              type="text"
              placeholder="Item"
              defaultValue={selectedStockItem.item}
              width='50%'
            />

          </div>

          <div className="mb-3 d-flex justify-content-between">
          <FormLabel whiteSpace='nowrap'> Retail Price </FormLabel>  
            <Input
              {...register("retail_price")}
              type="text"
              placeholder="Retail Price"
              defaultValue={selectedStockItem.retail_price}
              width='50%'
            />
          </div>
          
          <div className="mb-3 d-flex justify-content-between">
          <FormLabel>Cost</FormLabel>
            <Input
              {...register("cost")}
              type="text"
              placeholder="Cost"
              defaultValue={selectedStockItem.cost}
              width='50%'
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
          <FormLabel whiteSpace='nowrap'>Selling Price</FormLabel>
            <Input
              {...register("selling_price")}
              type="text"
              placeholder="Selling Price"
              defaultValue={selectedStockItem.selling_price}
              width='50%'
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
          <FormLabel>Discount</FormLabel>
            <Input
              {...register("discount")}
              type="text"
              placeholder="Discount"
              defaultValue={selectedStockItem.discount}
              width='50%'
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
          <FormLabel>Qty</FormLabel>
            <Input
              {...register("qty")}
              type="text"
              placeholder="Qty"
              defaultValue={selectedStockItem.qty}
              width='50%'
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
          <FormLabel whiteSpace='nowrap'>Sold Qty</FormLabel>
            <Input
              {...register("sold_qty")}
              type="text"
              placeholder="Sold Qty"
              defaultValue={selectedStockItem.sold_qty}
              width='50%'
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorStockItemUpdate("");
              setSuccess("");
            }}
          >
            Update
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UpdateStockItemForm;