import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { StockInvoice } from "../../../../services/Stock/stock-invoice-page-service";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import StockPaymentContext from "../../../../Contexts/Stock/StockPaymentContext";
import stockPaymentService, {
  StockPayment,
} from "../../../../services/Stock/stock-payment-service";
import {
  stockInvoicePaymentTotal,
  stockInvoiceTotal,
} from "../../Calculations/StockInvoiceCalculation";
import MultiplePaymentConfirmation from "./MultiplePaymentConfirmation";
import AllStockInvoiceContext from "../../../../Contexts/Stock/AllStockInvoiceContext";
import StockInvoicePageContext from "../../../../Contexts/Stock/StockInvoicePageContext";
import stockPaymentVoucherService from "../../../../services/Stock/stock-payment-voucher-service";
import { GenerateBillNumber } from "../../../../Common/GenerateBillNumbers";

interface Props {
  selectedInvoices: StockInvoice[];
  setSelectedInvoices: Dispatch<SetStateAction<StockInvoice[]>>;
}

const DoMultiplePaymentsForm = ({
  selectedInvoices,
  setSelectedInvoices,
}: Props) => {
  const [isPaymentBillCreated, setIsPaymentBillCreated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const { handleSubmit, register, setValue } = useForm<StockPayment>();

  // selected Payment method
  const [selectedValue, setSelectedValue] = useState("1");

  // for refetching
  const { stockPayments, setRefetchStockPayments } =
    useContext(StockPaymentContext);
  const { setRefetchStockInvoices } = useContext(AllStockInvoiceContext);
  const { setRefetchPageStockInvocie } = useContext(StockInvoicePageContext);
  const dateNow = new Date();
  console.log(dateNow);

  useEffect(() => {
    const totalDebit = stockInvoiceTotal(stockPayments, selectedInvoices);
    setValue("amount", totalDebit);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const isCash = selectedValue === "1" ? true : false;
    const isCheque = selectedValue === "2" ? true : false;
    const isCreditCard = selectedValue === "3" ? true : false;

    let payments = [];
    let newly = {};
    for (let seletedStockInvoice of selectedInvoices) {
      if (isCheque) {
        newly = {
          is_cash: isCash,
          is_cheque: isCheque,
          is_credit_card: isCreditCard,
          amount:
            seletedStockInvoice.total_amount -
            stockInvoicePaymentTotal(stockPayments, seletedStockInvoice),
          bank: data.bank,
          branch: data.branch,
          cheque_date: data.cheque_date,
          stock_invoice: seletedStockInvoice.invoice_no,
        };
      } else {
        newly = {
          is_cash: isCash,
          is_cheque: isCheque,
          is_credit_card: isCreditCard,
          amount:
            seletedStockInvoice.total_amount -
            stockInvoicePaymentTotal(stockPayments, seletedStockInvoice),
          stock_invoice: seletedStockInvoice.invoice_no,
        };
      }

      payments.push(newly);

      // await stockPaymentService
      //   .create(newly)
      //   .then((res) => {
      //     setPaymentSuccess("Payment Succesfull.");
      //     setIsPaymentBillCreated(true);

      //     // For refetching
      //     setRefetchStockPayments(dateNow+'')
      //     setRefetchStockInvoices(dateNow+'')
      //     setRefetchPageStockInvocie(dateNow+'')

      //   })
      //   .catch((err) => setPaymentError(err.message));
    }

    const generateRandomNumber = new GenerateBillNumber("VCH");
    const number = generateRandomNumber.generate();

    


    if (selectedInvoices.length === payments.length){
      const newlyVoucher = {
        voucher: number,
        total_payment: data.amount,
        stock_payments: payments,
      };

    await stockPaymentVoucherService
        .create(newlyVoucher)
        .then((res) => {
          setPaymentSuccess("Payment Succesfull.");
          setIsPaymentBillCreated(true);
          setRefetchStockPayments(dateNow + "");
          setRefetchStockInvoices(dateNow + "");
          setRefetchPageStockInvocie(dateNow + "");
        })
        .catch((err) => setPaymentError(err.message));

    }

  };

  const onConfirm = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <Flex fontWeight="bold" flexDir="column">
      {paymentSuccess && <Text textColor="green.800">{paymentSuccess}</Text>}
      {paymentError && <Text textColor="red.700">{paymentError}</Text>}

      <VStack marginBottom={5} justifyContent="space-between" align="start">
       
        <Text>PAYMENTS</Text>
      </VStack>

      <form>
        <VStack>
          <>
            <Text>Select Payment Method</Text>

            <RadioGroup
              onChange={(value) => {
                setSelectedValue(value);
                setPaymentSuccess("");
                setPaymentError("");
              }}
              isDisabled={isPaymentBillCreated}
              value={selectedValue}
              marginBottom={3}
            >
              <Stack direction="row">
                <Radio value="1">Cash</Radio>
                <Radio value="2">Cheque</Radio>
                <Radio value="3">Credit Card</Radio>
              </Stack>
            </RadioGroup>

            {selectedValue === "2" && (
              <>
                <HStack width="100%" whiteSpace="nowrap" alignItems="left">
                  <InputGroup>
                    <InputLeftAddon children="Check Date" />
                    <Input type="date" {...register(`cheque_date`)} />
                  </InputGroup>
                </HStack>
                <Input
                  type="text"
                  placeholder="Bank"
                  marginBottom={3}
                  {...register(`bank`)}
                />
                <Input
                  type="text"
                  placeholder="Branch"
                  marginBottom={3}
                  {...register(`branch`)}
                />
              </>
            )}
            <Input
              isReadOnly={true}
              placeholder="Amount"
              marginBottom={5}
              {...register(`amount`)}
            />
          </>
        </VStack>
        {!isPaymentBillCreated && (
          <MultiplePaymentConfirmation onConfirm={onConfirm} />
        )}
      </form>
    </Flex>
  );
};

export default DoMultiplePaymentsForm;
