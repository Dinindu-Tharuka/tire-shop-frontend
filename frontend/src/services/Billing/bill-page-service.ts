import createPagination from "../http-pagination-service";

export interface DagPayment{
    id:number;
    received_supplier_tyre:number;
    cost:number;
    customer_price:number;
}

export interface BillItem{
    id:number;
    item:string;
    stock_item_unique:number;
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

export interface PaymentCheque{
    id:number;
    bill_payment_id:number;
    date:string;
    amount:number;
    cheque_no:string;
    payeename:string;
    bank:string;
    branch:string;
    cheque_date:string;
}

export interface PaymentCreditCard{
    id:number;
    bill_payment:number;
    date:string;
    payeename:string;
    amount:number;
}

export interface PaymentCredit{
    id:number;
    bill_payment:number;
    date:string;
    due_date:string;
    payeename:string;
    amount:number;
}

export interface BillPayment{
    id:number;
    bill_id:string;
    date:string;
    discount:number;
    payment_methods:string;
    payments_cash:PaymentCash[];
    payment_cheques:PaymentCheque[];
    payments_credit_card:PaymentCreditCard[];
    payments_credit:PaymentCredit[];
}

export interface Bill{
    invoice_id:string;
    vehicle:string;
    date:string;
    discount_amount:number;
    sub_total:number;
    custome_item_value:number;
    bill_items:BillItem[];
    bill_services:BillService[];
    bill_payments:BillPayment[];
    dag_payments:DagPayment[];
}
export interface BillPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Bill[];
}


export default createPagination('/bills/')