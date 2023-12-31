import {
  Divider,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BillPaymentContext from "../../../../../Contexts/Bill/BillPaymentContext";
import AllBillContext from "../../../../../Contexts/Bill/AllBillContext";
import AllCustomerContext from "../../../../../Contexts/Customer/AllCustomerContext";
import VehicleContext from "../../../../../Contexts/Customer/VehicleContext";

interface Props {
  startDate: string;
  endDate: string;
}

const CashReport = ({ startDate, endDate }: Props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { billPayments } = useContext(BillPaymentContext);
  const { allBills } = useContext(AllBillContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { vehicles } = useContext(VehicleContext);

  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start > end) {
    end.setDate(start.getDate() + 1);
  }
  if (isNaN(end.getTime()) && isNaN(start.getTime())) {
    end = new Date();
    start = new Date();
  } else if (isNaN(end.getTime())) {
    end = new Date();
    end.setDate(start.getDate());
  }
  // For Calculatons

  useEffect(() => {
    let total: number[] = [];
    setTotalAmount(0);
    let index = 0;
    billPayments.forEach((payment) =>
      payment.payments_cash
        .filter((c) => new Date(c.date) >= start && new Date(c.date) < end)
        .forEach((cash) => {
          console.log("cash", cash);
          total[index] = cash.amount;
          setTotalAmount(
            total.reduce(
              (currentValue, cas) => currentValue + parseFloat(cas + ""),
              0
            )
          );
          index++;
        })
    );
  }, [startDate, endDate]);

  return (
    <>
      <Tag padding={5} width="58vw" fontWeight="bold">
        Daily Cash Payment
      </Tag>

      <TableContainer width="58vw">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Payee Name</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {billPayments.map((payment, index) => (
              <>
                {payment.payments_cash
                  .filter(
                    (c) => new Date(c.date) >= start && new Date(c.date) < end
                  )
                  .map((cash) => (
                    <Tr>
                      <Td>{payment.bill_id}</Td>
                      <Td>{cash.date}</Td>
                      <Td>
                        {
                           allCustomers.find( customer => customer.id === vehicles.find(
                            (vehicle) =>
                              allBills.find(
                                (bill) => bill.invoice_id === payment.bill_id
                              )?.vehicle === vehicle.vehical_no
                          )?.customer )?.name
                        }
                      </Td>
                      <Td>{cash.payeename}</Td>
                      <Td textAlign='right'>{cash.amount}</Td>
                    </Tr>
                  ))}
              </>
            ))}
            <Tr>
              <Th>Total Amount</Th>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td textAlign='right'>{totalAmount.toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider orientation="horizontal" />
    </>
  );
};

export default CashReport;
