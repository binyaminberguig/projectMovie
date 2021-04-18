import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import {Movie} from '../models/movie';
import {Router} from '@angular/router';
export interface PeriodicElement {
  title: string;
  position: number;
  nbPlace: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, title: 'Hydrogen', nbPlace: 1.0079},
  {position: 2, title: 'Helium', nbPlace: 4.0026},
  {position: 3, title: 'Lithium', nbPlace: 6.941},
];
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'nbPlace','actions'];
  dataSource = ELEMENT_DATA;
  noteTitle: string;
  noteText: string;
  img: any;
  accept="image/png, image/jpeg"
  movies: any;

  constructor(public moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    console.log(this.movies)
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
      (film: any) => {
        this.movies.push(movie);
        console.log('ajouté')
      },
      (error) => {
        console.log('error');
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
        console.log("error")
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


