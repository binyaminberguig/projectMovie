import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNote(noteId:any):Observable<any>{
    return this.http.get("http://localhost:3000/notes/"+ noteId)
  }

  updateNote(note):any{
    return this.http.put("http://localhost:3000/notes/"+ note._id, note)
  }

  deleteNote(noteId:any):Observable<any>{
    return this.http.delete("http://localhost:3000/notes/"+ noteId)
  }
}
