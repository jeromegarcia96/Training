import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../domain/product";
import { PaginationResult } from "src/domain/paginationresult";


@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {  
    }

    
    getProductWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44351/api/Product/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Product> });   
    }


    getProduct() {
        return this.http.get("https://localhost:44351/api/Product")
            .toPromise()
            .then(data => {return data as Product[] });       
    }

    addProduct(objEntity: Product) {
        return this.http.post("https://localhost:44351/api/Product", objEntity)
        .toPromise()
        .then(data => {return data as Product });
    }

    editProduct(id, objEntity: Product) {
        return this.http.put("https://localhost:44351/api/Product/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Product });
    }

    deleteProduct(id) {
        return this.http.delete("https://localhost:44351/api/Product/" + id)
        .toPromise()
        .then(() => null);
    }

  
}