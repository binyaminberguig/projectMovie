import { Injectable } from '@angular/core';
import {Movie} from './models/movie';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    movies: Array<Movie> = new Array<Movie>();
    constructor(private http: HttpClient) { }

  getMovies():any{
    console.log("ok");
    return this.http.get("http://localhost:3000/movies");
  }

  addMovie(movie): any{
    console.log(movie);
    return this.http.post("http://localhost:3000/movie",movie);
  }

  addReservation(reservation) {
    console.log(reservation);
    return this.http.post("http://localhost:3000/reservation",reservation);
  }

  getReservations():any{
    console.log("ok");
    return this.http.get("http://localhost:3000/reservation");
  }
}
