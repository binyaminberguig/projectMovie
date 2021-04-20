import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { Movie } from '../models/movie';
import {MoviesService} from "../movies.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  accept="image/png, image/jpeg"
  id:any;
  movies:Movie;
  constructor(private route: ActivatedRoute, private router: Router, public moviesService:MoviesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
      this.moviesService.getMovie(this.id).subscribe(
        (movies: Movie) => {
          this.movies = movies;
          console.log(this.movies)
        },
        (error) => {
          console.log("error", error)
        }
      )

  }

  updateNote():void {
    this.moviesService.updateNote(this.movies).subscribe(
      (movies:Movie)=>{
        this.router.navigate(["/notes"]);
      },
      (error)=>{
        console.log("error update", error)
      }
    );
  }


}
