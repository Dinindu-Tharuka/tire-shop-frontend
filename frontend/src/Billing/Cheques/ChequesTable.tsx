import {
  Button,
  Flex,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import AllPaymentChequeContext from "../../Contexts/Bill/Payments/AllPaymentsChequesContext";
import PagePaymentChequeContext from "../../Contexts/Bill/Payments/PagePaymentChequesContext";
import getCutUrl, {
  MAXIMUM_CHEQUES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import CheckBankDateReportModel from "./Reports/CheckBankDateReportModel";
import VehicleContext from "../../Contexts/Customer/VehicleContext";

const ChequesTable = () => {
  const { allBills } = useContext(AllBillContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { billPayments } = useContext(BillPaymentContext);
  const { allPaymentCheques, setPaymentChequesBillStartDateFilter } = useContext(AllPaymentChequeContext);
  const { vehicles } = useContext(VehicleContext)

  const {
    pagePaymentCheques,
    pagePaymentChequesCount,
    setFilterPagePaymentChequesParams,
    previousPagePaymentChequesUrl,
    nextpagePaymentChequesUrl,
    setPagePaymentChequesFetchError,
    setPAgePaymentChequesBillStartDateFilter,
    setPagePaymentChequesEndDateFilter,
  } = useContext(PagePaymentChequeContext);

  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const numOfPages = Math.ceil(
    pagePaymentChequesCount / MAXIMUM_CHEQUES_PER_PAGE
  );

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPAgePaymentChequesBillStartDateFilter(event.currentTarget.value);
    setPaymentChequesBillStartDateFilter(event.currentTarget.value);
  };

  return (
    <Flex alignItems="center" flexDir="column">
      <HStack marginBottom={5}>
        <InputGroup>
          <InputLeftAddon children="SELECT" />
          <Input
            type="date"
            width="20vw"
            onChange={onChangeDate}
          />
        </InputGroup>

        <CheckBankDateReportModel filteredCheques={allPaymentCheques} />
      </HStack>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Cheque Date</Th>
              <Th>Amount</Th>
              <Th>Cheque Number</Th>
              <Th>Bank</Th>
              <Th>Branch</Th>
              <Th>Vehicle</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pagePaymentCheques.map((cheque) => (
              <>
                <Tr>
                  <Td>{cheque.cheque_date}</Td>
                  <Td>{cheque.amount}</Td>
                  <Td>{cheque.cheque_no}</Td>
                  <Td>{cheque.bank}</Td>
                  <Td>{cheque.branch}</Td>
                  <Td>
                    {
                      vehicles.find(
                        (vehicle) =>
                          allBills.find(
                            (bill) =>
                              bill.invoice_id ===
                              billPayments.find(
                                (payment) =>
                                  payment.id ===
                                  parseInt(cheque.bill_payment_id + "")
                              )?.bill_id
                          )?.vehicle === vehicle.vehical_no
                      )?.vehical_no
                    }
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterPagePaymentChequesParams(
              getCutUrl(previousPagePaymentChequesUrl, "payments-page-cheque") +
                ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setPagePaymentChequesFetchError("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {currentPageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterPagePaymentChequesParams(
              getCutUrl(nextpagePaymentChequesUrl, "payments-page-cheque") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setPagePaymentChequesFetchError("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ChequesTable;
