import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useColorMode,
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";

interface Props{
    onSubmit:()=>void;
    isDiabled:boolean
}

const StockInvoiceSaveConfirmation = ({onSubmit, isDiabled}:Props) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  return (
    <>
      <Button
        width="10vw"
        bg={colorMode === "light" ? "#e3a99c" : "#575757"}
        onClick={onOpen}
        isDisabled={isDiabled}
      >
        save
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Confirm</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to save this Stock Invoice? After saving bill you can't
            edit it.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={() =>{ 
                onSubmit()
                onClose()
            }
            }
                colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StockInvoiceSaveConfirmation;
