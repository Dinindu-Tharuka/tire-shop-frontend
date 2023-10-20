import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import PayMultipleStockInvoicesPage from "./PayMultipleStockInvoicesPage";

const PayMultipleStockInvoicesModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} padding={5} marginRight={10} width={250}>
        Pay Multiple
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>GRN Payments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PayMultipleStockInvoicesPage />
          </ModalBody>          
        </ModalContent>
      </Modal>
    </>
  );
};

export default PayMultipleStockInvoicesModel;
