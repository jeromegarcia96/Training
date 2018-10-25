export interface Product {
    productID: any;
    productName: string;
    supplierID: string;
    supplierName: string;
    categoryID: string;
    categoryName: string;
    unitsInStock: number;
    unitPrice: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
}