import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Customer } from "../../services/Customer/customer-service";
import UpdateCustomerForm from "./UpdateCustomerForm";
import { PADDING_UPDATE_DRAWER_BUTTON } from "../../Constants/Constants";

interface Props {
  onSelectedCustomer: Customer;
}

const UpdateCustomerDrawer = ({ onSelectedCustomer }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        variant="link"
        bg="#ffc2b3"
        padding={PADDING_UPDATE_DRAWER_BUTTON}
        textColor={colorMode === "light" ? "#2b2323" : "#4d0012"}
        _hover={
          colorMode === "light"
            ? { background: "#3e3d40 " }
            : { background: "#fababb" }
        }
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Update Customer</DrawerHeader>

          <DrawerBody>
            <UpdateCustomerForm onSelectedCustomer={onSelectedCustomer} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateCustomerDrawer;
