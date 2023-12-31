import create from "../http-service";

export interface StockItem{
    id:number;
    item:string;
    retail_price:number;
    cost:number;
    customer_price:number;
    supplier_discount:number;
    sales_discount:number;
    customer_discount:number;
    qty:number;
}
export interface StockItemDefault{
    id:number;
    stock_invoice:string;
    stock_item_unique:number;
    item:string;
    retail_price:number;
    cost:number;
    customer_price:number;
    supplier_discount:number;
    sales_discount:number;
    customer_discount:number;
    qty:number;
    customer_unit_price:number;
    max_qty:number
}

export default create('/stock-item-list/')