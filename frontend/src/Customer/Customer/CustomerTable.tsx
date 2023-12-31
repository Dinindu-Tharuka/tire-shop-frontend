import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import CustomerService, {
  Customer,
} from "../../services/Customer/customer-service";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer";
import VehicleAccoringView from "../Vehicle/VehicleAccoringView";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import SelectedCustomerContext from "../../Contexts/Customer/SelectedCustomerContex";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import CustomerDelete from "./CustomerDelete";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";

const CustomerTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer
  );

  const [pageNum, setPageNum] = useState(1);
  const {
    customers,
    setCustomers,
    nextUrl,
    previousUrl,
    setFilterParams,
    errorCustomerFetch,
    setErrorCustomerFetch,
    isLoadingCustomer,
    customerCount,
  } = useContext(CustomerContext);

  const { allCustomers, setAllCustomers} = useContext(AllCustomerContext)

  const numOfPages = Math.ceil(customerCount / MAXIMUM_PAGES_PER_PAGE);

  const { colorMode } = useColorMode();

  

  if (isLoadingCustomer) return <Spinner />;
  return (
    <Flex alignItems="center" flexDir="column">
      {errorCustomerFetch && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Name</Th>
              <Th justifyContent="center"></Th>
              <Th>Address</Th>
              <Th>Telephone</Th>
              <Th>Mobile</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers?.map((customer, index) => (
              <Tr key={index}>
                <Td>
                  <UpdateCustomerDrawer onSelectedCustomer={customer} />
                </Td>
                <Td>
                  <CustomerDelete selectedDeleteCustomer={customer} />
                </Td>
                <Td>{customer.name}</Td>
                <Td>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            Vehicles
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <SelectedCustomerContext.Provider
                          value={{ selectedCustomer, setSelectedCustomer }}
                        >
                          <VehicleAccoringView customer_id={customer.id} />
                        </SelectedCustomerContext.Provider>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Td>
                <Td>{customer.address}</Td>
                <Td>{customer.telephone}</Td>
                <Td>{customer.mobile}</Td>
                <Td>{customer.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={pageNum === 1 ? true : false}
          onClick={() => {
            setFilterParams(getCutUrl(previousUrl, "customers") + "");
            setErrorCustomerFetch("");
            setPageNum(pageNum - 1);
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {pageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={pageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterParams(getCutUrl(nextUrl, "customers") + "");
            setPageNum(pageNum + 1);
            setErrorCustomerFetch("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default CustomerTable;
