import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "../domain/course";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class CourseService {

    constructor(private http: HttpClient) {  
    }

    getCourseWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44351/api/Course/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Course> });   
    }

    getCourse() {
        return this.http.get("https://localhost:44351/api/Course")
            .toPromise()
            .then(data => {return data as Course[] });   
    }

    addCourse(objEntity: Course) {
        return this.http.post("https://localhost:44351/api/Course", objEntity)
        .toPromise()
        .then(data => {return data as Course });
    }

    editCourse(id, objEntity: Course) {
        return this.http.put("https://localhost:44351/api/Course/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Course });
    }

    deleteCourse(id) {
        return this.http.delete("https://localhost:44351/api/Course/" + id)
        .toPromise()
        .then(() => null);
    }
}