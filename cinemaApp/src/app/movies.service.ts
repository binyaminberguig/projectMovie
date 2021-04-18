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
    console.log("ok");
    return this.http.get("http://localhost:3000/movies");
  }

}