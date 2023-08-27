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
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import AddItemDrawer from "../../componants/Inventory/Item/AddItemDrawer";
import AddCategoryDrawer from "../../componants/Inventory/Category/AddCategoryDrawer";
import AddSupplierDrawer from "../Supplier/AddSupplierDrawer";
import EmployeeAddForm from "../Employee/EmployeeAddForm";
import ServiceAddForm from "../Services/ServiceAddForm";
import AddServiceDrawer from "../Services/AddServiceDrawer";
import AddEmployeeDrawer from "../Employee/AddEmployeeDrawer";

const RegistrationSidePanel = () => {
  const registerList = ["User", "Employees", "Suppliers", "Services"];
  const register_links = ["", "employees", "suppliers", "services"];
  const { toggleColorMode, colorMode } = useColorMode();

  const options = ["ADD"];

  const registerMenuList = registerList.map((reg, index) => (
    <Flex key={index} width="100%" justifyContent="space-between">
      <Accordion
        allowToggle
        bg={colorMode === "light" ? "#e3a99c" : "#252528"}
        width="100%"
        borderRadius={10}
      >
        <AccordionItem borderRadius={10}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Link to={register_links[index]}>
                  <Text fontWeight="bold">{reg}</Text>
                </Link>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg={colorMode === "light" ? "#f1cac1" : ""}>
            {options.map((option, num) =>
              index === 0 ? (
                <AddItemDrawer key={num} />
              ) : index === 1 ? (
                <AddEmployeeDrawer key={num} />
              ) : index === 2 ? (
                <AddSupplierDrawer key={num} />
              ) : index === 3 ? (
                <AddServiceDrawer />
              ) : null
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  ));

  return (
    <Box>
      <Show above="lg">
        <VStack>{registerMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{registerMenuList}</HStack>
      </Show>
    </Box>
  );
};

export default RegistrationSidePanel;
