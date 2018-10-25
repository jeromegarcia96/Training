import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Student } from "../domain/student";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class StudentService {

    constructor(private http: HttpClient) {  
    }

    getStudentWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44351/api/Student/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Student> });   
    }

    getStudent() {
        return this.http.get("https://localhost:44351/api/Student")
            .toPromise()
            .then(data => {return data as Student[] });   
    }

    addStudent(objEntity: Student) {
        return this.http.post("https://localhost:44351/api/Student", objEntity)
        .toPromise()
        .then(data => {return data as Student });
    }

    editStudent(id, objEntity: Student) {
        return this.http.put("https://localhost:44351/api/Student/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Student });
    }

    deleteStudent(id) {
        return this.http.delete("https://localhost:44351/api/Student/" + id)
        .toPromise()
        .then(() => null);
    }
}