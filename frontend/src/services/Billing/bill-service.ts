import createPagination from "../http-pagination-service";

export interface BillItem{
    id:number;
    item:number;
    stock_item:number;
    bill:number;
    qty:number;
    customer_discount:number;
    customer_price:number;
}

export interface BillService{
    id:number;
    service:number;
    employee:number;
    bill:number;
}

export interface PaymentCash{
    id:number;
    bill_payment:number;
    date:string;
    payeename:string;
    amount:number;
}

export interface BillCheque{
    id:number;
    bill_payment:number;
    date:string;
    amount:number;
    cheque_no:string;
    payeename:string;
    bank:string;
    branch:string;
    cheque_date:string;
}

export interface BillCreditCard{
    id:number;
    bill_payment:number;
    date:string;
    payeename:string;
    amount:number;
}

export interface BillCredit{
    id:number;
    bill_payment:number;
    date:string;
    due_date:string;
    payeename:string;
    amount:number;
}

export interface BillPayment{
    id:number;
    bill:number;
    date:string;
    discount:number;
    payment_methods:string;
    payments_cash:PaymentCash[];
    payment_cheques:BillCheque[];
    payments_credit_card:BillCreditCard[];
    payments_credit:BillCredit[]
}

export interface Bill{
    invoice_id:string;
    customer:number;
    date:string;
    discount_amount:number;
    sub_total:number;
    custome_item_value:number;
    bill_items:BillItem[];
    bill_services:BillService[];
    bill_payments:BillPayment[]
}
export interface BillPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Bill[]
}


export default createPagination('/bills/')