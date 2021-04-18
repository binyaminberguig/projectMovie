import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../movies.service';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit {

  movies: Array<Movie>
  constructor(private route: ActivatedRoute,private router: Router,public moviesService: MoviesService) { }



  ngOnInit(): void {
    this.getMovies();
  }


  getMovies() {
    this.moviesService.getMovies().subscribe(
      (movies: Array<Movie>) => {
        this.movies = movies;
        console.log(this.movies);
      },
      (error) => {
        console.log("error")
      }
    )
  }

}
