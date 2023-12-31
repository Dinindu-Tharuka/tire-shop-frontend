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
import CustomerAddDrawer from "../Customer/CustomerAddDrawer";
const CustomerSidePanel = () => {
  const customerOptions = ["Customer"];
  const customerOptionLinks = ["", "categories"];
  const { colorMode } = useColorMode();

  const customerMenuList = customerOptions.map((option, index) => {
    return (
      <Flex key={index} width="100%" justifyContent="space-between">
        <Accordion
          allowToggle
          bg={colorMode === "light" ? "#e3a99c" : ""}
          width="100%"
          borderRadius={10}

        >
          <AccordionItem borderRadius={10}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text  fontWeight="bold"> Customer</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg={colorMode === "light" ? "#f1cac1" : ""}>
              {index === 0 ? <CustomerAddDrawer /> : ""}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  });
  return (
    <Box>
      <Show above="lg">
        <VStack>{customerMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{customerMenuList}</HStack>
      </Show>
    </Box>
  );
};

export default CustomerSidePanel;
