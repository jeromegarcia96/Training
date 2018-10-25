import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../domain/category";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class CategoryService {

    constructor(private http: HttpClient) {  
    }

    getCategoryWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44351/api/Category/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Category> });   
    }

    getCategory() {
        return this.http.get("https://localhost:44351/api/Category")
            .toPromise()
            .then(data => {return data as Category[] });   
    }

    addCategory(objEntity: Category) {
        return this.http.post("https://localhost:44351/api/Category", objEntity)
        .toPromise()
        .then(data => {return data as Category });
    }

    editCategory(id, objEntity: Category) {
        return this.http.put("https://localhost:44351/api/Category/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Category });
    }

    deleteCategory(id) {
        return this.http.delete("https://localhost:44351/api/Category/" + id)
        .toPromise()
        .then(() => null);
    }
}