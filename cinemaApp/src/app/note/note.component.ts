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
  movie:Movie;
  constructor(private route: ActivatedRoute, private router: Router, public moviesService:MoviesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
      this.moviesService.getMovie(this.id).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          console.log('movie:',this.movie)
        },
        (error) => {
          console.log("error", error)
        }
      )

  }

  updateMovie():void {
    this.moviesService.updateMovie(this.movie).subscribe(
      (movies:Movie)=>{
        console.log('good');
        this.router.navigate(["/notes"]);
      },
      (error)=>{
        console.log("error update", error)
      }
    );
  }


}
