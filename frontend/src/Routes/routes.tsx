import { createBrowserRouter } from "react-router-dom";
import GridSection from "../MainPages/GridSection";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import ItemTable from "../componants/Inventory/Item/ItemTable";
import CategoryTable from "../componants/Inventory/Category/CategoryTable";
import SupplierTable from "../Registration/Supplier/SupplierTable";
import RegistraionMainPage from "../Registration/MainPage/RegistrationMainPage";
import CustomerMainPage from "../Customer/MainPage/CustomerMainPage";
import EmployeeTable from "../Registration/Employee/EmployeeTable";
import ServicesTable from "../Registration/Services/ServicesTable";
import BillingMainPage from "../Billing/MainPage/BillingMainPage";
import BillTable from "../Billing/Bill/BillTable";
import StockInvoiceTable from "../Billing/StockInvoice/StockInvoiceTable";
import RebuiltMainPage from "../Billing/Rebuilt/MainPage/RebuiltMainPage";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../Authentication/LoginPage";
import PasswordReset from "../Authentication/PasswordReset";
import UserListTable from "../Registration/User/UserListTable";
import CreditorsTable from "../Billing/Creditors/CreditorsTable";

const routes = createBrowserRouter([
  
  {
    path:"/login",
    element: <LoginPage/>
  },
  {
    path:"/password/reset/:uid/:token",
    element: <PasswordReset/>
  },
  {
    element: <PrivateRoutes/>,
    children:[
      {
        path: "/",
        element: <GridSection />,
        children: [
          { index: true, element: <MainImage /> },
          {
            path: "inventory",
            element: <Inventory />,
            children: [
              { path: "", element: <ItemTable /> },
              { path: "categories", element: <CategoryTable /> },
            ],
          },
          { path: "customer", element: <CustomerMainPage /> },
          {
            path: "registration",
            element: <RegistraionMainPage />,
            children: [
              { path: "", element: <EmployeeTable /> },
              { path: "suppliers", element: <SupplierTable /> },
              { path: "services", element: <ServicesTable /> },
              { path: "user", element: <UserListTable /> },
            ],
          },
          {
            path: "billing",
            element: <BillingMainPage />,
            children: [
              { path: "", element: <BillTable /> },
              { path: "rebuilt", element: <RebuiltMainPage /> },
              { path: "stock-invoice", element: <StockInvoiceTable /> },
              { path: "creditors", element: <CreditorsTable /> },
            ],
          },
        ],
      },
    ]
  }
]);

export default routes;
