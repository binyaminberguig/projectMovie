import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import {Movie} from '../models/movie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'nbPlace','actions'];
  noteTitle: string;
  noteText: string;
  img: any;
  accept="image/png, image/jpeg"
  movies: any;


  constructor(public moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  addMovie(): void {

    const movie: Movie = new Movie();
    movie._id = Math.random(),
    movie.title = this.noteTitle,
    movie.description = this.noteText,
    movie.picture = "./assets/images/" + this.img.name;

    this.noteTitle = '';
    this.noteText = '';
    this.img= '';
    this.moviesService.addMovie(movie).subscribe(
      (movie: any) => {
        this.movies.push(movie);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }


  /*editNote(noteId: number): void {
    this.router.navigate(['/note', noteId]);
  }*/


  getMovies() {
    this.moviesService.getMovies().subscribe(
      (movies: Array<Movie>) => {
        this.movies = movies;
        console.log(this.movies);
      },
      (error) => {
        console.log("error", error)
      }
    )
  }
/*
  deleteNote(note: Film) {
    this.notesService.deleteNote(note._id).subscribe(
      () => {
        const index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
      },
      (error) => {
        console.log('delete error');
      }
    );
  }*/
}


