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
  movieTitle: string;
  movieSynopsis: string;
  moviePlace: any;
  moviePicture: any;
  accept="image/png, image/jpeg"
  movies: any;


  constructor(public moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  addMovie(): void {

    const movie: Movie = new Movie();
    movie._id = Math.random(),
    movie.title = this.movieTitle,
    movie.synopsis = this.movieSynopsis,
    movie.picture = "./assets/images/" + this.moviePicture.name;
    movie.nbPlace = this.moviePlace,

    this.movieTitle = '';
    this.movieSynopsis = '';
    this.moviePicture= '';
    this.moviePlace = '';
    this.moviesService.addMovie(movie).subscribe(
      (movie: any) => {
        this.movies.push(movie);
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.getMovies();
  }


  editNote(noteId: number): void {
    this.router.navigate(['/note', noteId]);
  }


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

  deleteNote(movie: Movie) {
    console.log(movie);
    this.moviesService.deleteNote(movie._id).subscribe(
      () => {
        const index = this.movies.indexOf(movie);
        this.movies.splice(index, 1);
      },
      (error) => {
        console.log('delete error',error);
      }
    );
    this.getMovies();
  }
}


