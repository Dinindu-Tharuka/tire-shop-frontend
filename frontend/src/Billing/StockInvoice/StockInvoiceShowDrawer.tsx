
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
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import StockInvoiceShowPage from "./StockInvoiceShowPage";

interface Props {
  selectedStockInvoice: StockInvoice;
}

const StockInvoiceShowDrawer = ({ selectedStockInvoice }:Props) => {
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
        Show
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>GRN Invoice</DrawerHeader>

          <DrawerBody>
            <StockInvoiceShowPage seletedStockInvoice={ selectedStockInvoice }/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StockInvoiceShowDrawer;
