// export interface Order {
//     orderID: string;
//     customerID: any;
//     // customer: string;
//     customerName: string;
//     employeeID: any;
//     // employee: string;
//     employeeName: string;
//     orderDate: any;
//     requiredDate: any;
//     shippedDate: any;
//     shipperID: any;
//     // shipVia: string;
//     shipViaName: string;
//     freight: number;
//     shipName: string;
//     shipAddress: string;
//     shipCity: string;
//     shipRegion: string;
//     shipPostalCode: string;
//     shipCountry: string;
//     // orderDetails: string;
// }

export interface Order{
    orderID: string;
    customerID: any;
    customerName: string;
    employeeID: any;
    employeeName: string;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    shipperID: any;
    shipViaName: string;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
}