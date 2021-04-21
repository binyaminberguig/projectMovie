import { Injectable } from '@angular/core';
import {Movie} from './models/movie';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    movies: Array<Movie> = new Array<Movie>();
    constructor(private http: HttpClient) { }

  getMovies():any{
    return this.http.get("http://localhost:3000/movies");
  }

  addMovie(movie): any{
    return this.http.post("http://localhost:3000/movie",movie);
  }

  deleteNote(noteId:any):Observable<any>{
    return this.http.delete("http://localhost:3000/movies/"+ noteId)
  }

  getMovie(movieId:any):Observable<any>{
    return this.http.get("http://localhost:3000/movie/"+ movieId)
  }

  updateMovie(movie):any{
      console.log(movie)
    return this.http.put("http://localhost:3000/movies/"+ movie._id, movie)
  }

  addReservation(reservation) {
    return this.http.post("http://localhost:3000/reservation",reservation);
  }

  getReservations():any{
    return this.http.get("http://localhost:3000/reservation");
  }
}
