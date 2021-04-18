import { Injectable } from '@angular/core';
import {Film} from './models/film';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  films: Array<Film> = new Array<Film>();
  constructor(private http: HttpClient) { }

  addFilm(film): any{
    return this.http.post("http://localhost:3000/film",film);
  }

  getFilms():any{
    return this.http.get("http://localhost:3000/films");
  }

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
