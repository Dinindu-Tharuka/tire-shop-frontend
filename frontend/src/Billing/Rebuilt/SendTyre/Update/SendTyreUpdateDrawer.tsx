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
import { useRef } from "react";
import { SendTyre } from "../../../../services/Rebuild/send-tyre-service";
import SendTyreUpdate from "./SendTyreUpdate";

interface Props {
  selectedSendTyre: SendTyre;
}

const SendTyreUpdateDrawer = ({ selectedSendTyre }: Props) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        textAlign="left"
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
        bg={colorMode === "light" ? "#f1cac1" : ""}
        _hover={
          colorMode === "light"
            ? { background: "#f1cac1" }
            : { background: "#766f6f" }
        }
        padding={2.5}
        width="5vw"
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>
            Update Send Tyres {selectedSendTyre.order_no}
          </DrawerHeader>

          <DrawerBody>
            <SendTyreUpdate selectedSendTyre={selectedSendTyre} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SendTyreUpdateDrawer;
