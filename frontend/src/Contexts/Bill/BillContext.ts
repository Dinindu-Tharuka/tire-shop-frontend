import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill } from "../../services/Billing/bill-page-service";

interface BillContextType{
    bills:Bill[];
    setBills:Dispatch<SetStateAction<Bill[]>>;
    nextBillPageUrl:string|null;
    previousBillPageUrl:string|null;
    setFilterBillPageParams:Dispatch<SetStateAction<string | null>>;
    filterBillPageParams:string | null;
    billFetchError:string;
    isLoadingBills:boolean;
    billCount:number;
    setBillFetchError: Dispatch<SetStateAction<string>>;
    setBillIdFilter:Dispatch<SetStateAction<string>>;
    setBillFilterCustomer:Dispatch<SetStateAction<string>>;
    setBillVehicleFilter:Dispatch<SetStateAction<string>>
    setBillStartDateFilter:Dispatch<SetStateAction<string>>; 
    setBillEndDateFilter:Dispatch<SetStateAction<string>>
}

const BillContext = React.createContext<BillContextType>({} as BillContextType)

export default BillContext;