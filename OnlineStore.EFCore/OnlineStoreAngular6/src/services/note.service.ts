import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Note } from "../domain/note";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class NoteService {

    constructor(private http: HttpClient) {  
    }


    getNote() {
        return this.http.get("https://localhost:44351/api/Note")
            .toPromise()
            .then(data => {return data as Note[] });   
    }

    addNote(objEntity: Note) {
        return this.http.post("https://localhost:44351/api/Note", objEntity)
        .toPromise()
        .then(data => {return data as Note });
    }

    editNote(id, objEntity: Note) {
        return this.http.put("https://localhost:44351/api/Note/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Note });
    }

    deleteNote(id) {
        return this.http.delete("https://localhost:44351/api/Note/" + id)
        .toPromise()
        .then(() => null);
    }
}