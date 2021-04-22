import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import {MoviesService} from "../movies.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  accept="image/png, image/jpeg"
  id:any;
  movie:Movie;
  
  constructor(private route: ActivatedRoute, private router: Router, public moviesService:MoviesService) { }

  ngOnInit(): void {
    this.movie = new Movie();
    this.id = this.route.snapshot.paramMap.get('_id');
      this.moviesService.getMovie(this.id).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          var file = new File([], movie.picture, {type: "",});
          movie.picture = file;
        },
        (error) => {
          console.log("error", error)
        }
      )

  }

  updateMovie():void {
    this.moviesService.updateMovie(this.movie).subscribe(
      (movies:Movie)=>{
        console.log(this.movie.picture);
        this.router.navigate(["/moviesmanager"]);
      },
      (error)=>{
        console.log("error update", error)
      }
    );
  }


}
