import {
  Button,
  useColorMode,
  Text,
  Select,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import receivedTyreService, {
  ReceivedTyre,
} from "../../../../services/Rebuild/received-tyre-service";
import ReceivedTyreContext from "../../../../Contexts/Rebuild/Received/ReceivedTyreContex";
import AddSupplierReceivedTyres from "./AddSupplierReceivedTyres";

const AddReceivedTyreForm = () => {
  const { register, handleSubmit, control } = useForm<ReceivedTyre>();

  const [errorSendTyreCreate, setErrorSendTyreCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { receivedTyres, setReceivedTyres } = useContext(ReceivedTyreContext);

  const onCreate = (data: ReceivedTyre) => {
    console.log(data, "submitted");
    const originalTakenTyres = [...receivedTyres];

    receivedTyreService
      .create(data)
      .then((res) => {
        setSuccess("Succefully created.");
        console.log(res.data, "response");

        setReceivedTyres([res.data, ...receivedTyres]);
        // setAllSendSupplierTyres([...allSendSupplierTyres, ...res.data.send_tyres])
      })
      .catch((err) => {
        setErrorSendTyreCreate("Not Succefully created.");
        setReceivedTyres([...originalTakenTyres]);
      });
  };
  return (
    <>
      {errorSendTyreCreate && (
        <Text textColor="#dd0939">{errorSendTyreCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onCreate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-50">
            <Input {...register("invoice_no")} placeholder="Invoice No" />
          </div>

          <div className="mb-3 w-100">
            <AddSupplierReceivedTyres register={register} control={control} />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorSendTyreCreate("");
              setSuccess("");
            }}
          >
            Create
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default AddReceivedTyreForm;
