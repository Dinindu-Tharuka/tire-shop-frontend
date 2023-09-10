import { Grid, GridItem, useColorMode, Text } from "@chakra-ui/react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import { Outlet } from "react-router-dom";
import useStockInvoicePage from "../../hooks/Stock/useStockInvoicePage";
import useStockItem from "../../hooks/Stock/useStockItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import useBillPayment from "../../hooks/Billing/useBillPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import useBill from "../../hooks/Billing/useBill";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import useStockInvoice from "../../hooks/Stock/useStockInvoice";

const BillingMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const {
    stockInvoices,
    setStockInvoices,
    errorFetchStockInvoice,
    isLoadingInvoices,
    setErrorFetchStockInvoice,
  } = useStockInvoice();

  const {
    billPayments,
    setBillPayments,
    billPaymentFetchError,
    setBillPaymentFetchError,
    isLoadingBillPayments,
    setIsLoadingBillPayments,
  } = useBillPayment();

  const { bills, setBills, billFetchError, isLoadingBills } = useBill();

  const { stockItems, setStockItems } = useStockItem();
  return (
    <StockInvoiceContext.Provider
      value={{
        stockInvoices,
        setStockInvoices,
        errorFetchStockInvoice,
        isLoadingInvoices,
        setErrorFetchStockInvoice,
      }}
    >
      <BillPaymentContext.Provider
        value={{
          billPayments,
          setBillPayments,
          billPaymentFetchError,
          setBillPaymentFetchError,
          isLoadingBillPayments,
        }}
      >
        <StockItemContext.Provider value={{ stockItems, setStockItems }}>
          <AllBillContext.Provider
            value={{
              bills,
              setBills,
              isLoadingBills,
              billFetchError,
            }}
          >
            <Grid
              templateAreas={{
                lg: `"main aside"`,
                base: `"aside" "main"`,
              }}
            >
              <GridItem
                area="main"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "60vw" }}
              >
                <Outlet />
              </GridItem>
              <GridItem
                area="aside"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "15vw" }}
                boxShadow="dark-lg"
                borderRadius={30}
                padding={5}
                bg={colorMode === "light" ? "#ca5c4f" : ""}
              >
                <BillingSidePanel />
              </GridItem>
            </Grid>
          </AllBillContext.Provider>
        </StockItemContext.Provider>
      </BillPaymentContext.Provider>
    </StockInvoiceContext.Provider>
  );
};

export default BillingMainPage;
