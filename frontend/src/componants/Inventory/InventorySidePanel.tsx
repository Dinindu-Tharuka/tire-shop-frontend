import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import InventoryAddButtonDrawer from "./Drawers/AddButtonDrawer";
import { FieldValues } from "react-hook-form";

interface Props {
  onCreated:(data:FieldValues)=>void;
}

const InventorySidePanel = ({onCreated}:Props) => {
  const inventoryList = ["Item", "Item Category", "Supplier"];
  const { toggleColorMode, colorMode } = useColorMode();
  const [categories, setCategories] = useState([]);

  const options = ["ADD"];

  const inventoryMenuList = inventoryList.map((inventory, index) => (
    <Box key={index} width="100%">
      <Menu>
        <MenuButton
          paddingRight={4}
          height="10vh"
          width="100%"
          textAlign="left"
          as={Button}
          rightIcon={<AiOutlineDown />}
          _hover={
            colorMode === "light"
              ? { background: "#fababb" }
              : { background: "#3e3d40" }
          }
        >
          {inventory}
        </MenuButton>
        <MenuList>
          {options.map((option, index) => (
            <InventoryAddButtonDrawer
              key={index}
              inventory={inventory}
              option={option}
              onCreated={onCreated}
            />
          ))}
        </MenuList>
      </Menu>
    </Box>
  ));

  return (
    <>
      <Show above="lg">
        <VStack>{inventoryMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{inventoryMenuList}</HStack>
      </Show>
    </>
  );
};

export default InventorySidePanel;
