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
import getCutUrl from "../GetCuUrl";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io'
import SelectedCustomerContext from "../../Contexts/Customer/SelectedCustomerContex";

const CustomerTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>({} as Customer)
  const {
    customers,
    setCustomers,
    nextUrl,
    previousUrl,
    setFilterParams,
    filterParams,
  } = useContext(CustomerContext);
  const {toggleColorMode, colorMode} = useColorMode();

  const onDeleteCustomer = (customer: Customer) => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter((cu) => cu.id !== customer.id));

    CustomerService.delete(`${customer.id}`).catch((err) =>
      setCustomers([...originalCustomers])
    );
  };
  return (
    <>
      <Flex alignItems='center' flexDir='column'>
        
    
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th justifyContent="center"></Th>
                <Th>Address</Th>
                <Th>Telephone</Th>
                <Th>Mobile</Th>
                <Th>Email</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers?.map((customer, index) => (
                <Tr key={index}>
                  <Td>{customer.name}</Td>
                  <Td>
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton onClick={()=> setSelectedCustomer(customer)}>
                            <Box as="span" flex="1" textAlign="left">
                              Vehicles
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <SelectedCustomerContext.Provider value={{selectedCustomer, setSelectedCustomer}}>
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

                  <Td>
                    <UpdateCustomerDrawer onSelectedCustomer={customer} />
                  </Td>
                  <Td>
                    <Button
                      onClick={() => onDeleteCustomer(customer)}
                      padding={4}
                      bg="#f87454"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <HStack>
          <Button 
            colorScheme={colorMode === 'light'?'blackAlpha':'whiteAlpha'}
            onClick={() => setFilterParams(getCutUrl(previousUrl) + "")}
          ><IoIosArrowDropleftCircle/></Button>
          <Button
            colorScheme={colorMode === 'light'?'blackAlpha':'whiteAlpha'}
            onClick={() => setFilterParams(getCutUrl(nextUrl) + "")}
          ><IoIosArrowDroprightCircle/></Button>
        </HStack>        

      </Flex>
    </>
  );
};

export default CustomerTable;