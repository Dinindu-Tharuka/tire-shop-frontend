import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddSupplierDrawer from "../Supplier/AddSupplierDrawer";
import AddServiceDrawer from "../Services/AddServiceDrawer";
import AddEmployeeDrawer from "../Employee/AddEmployeeDrawer";
import UserAddDrawer from "../User/UserAddDrawer";
import { useState } from "react";

const RegistrationSidePanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const registerList = ["Employees", "Suppliers", "Services", "User"];
  const register_links = ["", "suppliers", "services", "user"];
  const { colorMode } = useColorMode();

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
            <AccordionButton onClick={()=>setSelectedIndex(index)} padding={0}>
              <Box as="span" flex="1" textAlign="left" bg={selectedIndex === index ? '#f1cac1':''} padding={3} borderRadius={10}>
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
                <AddEmployeeDrawer key={num} />
              ) : index === 1 ? (
                <AddSupplierDrawer key={num} />
              ) : index === 2 ? (
                <AddServiceDrawer key={num} />
              ) : index === 3 ? (
                <UserAddDrawer />
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
