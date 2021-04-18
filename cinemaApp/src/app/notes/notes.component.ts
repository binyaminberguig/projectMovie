import { Component, OnInit } from '@angular/core';
import {NotesService} from '../notes.service';
import {Film} from '../models/film';
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
  img: string;
  accept="image/png, image/jpeg"
  films: any;

  constructor(public notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.getFilms();
    console.log(this.films)
  }

  addNote(): void {

    const film: Film = new Film();
    film._id = Math.random(),
      film.title = this.noteTitle,
      film.description = this.noteText,
      film.image = this.img;

    this.noteTitle = '';
    this.noteText = '';
    this.img= '';
    this.notesService.addFilm(film).subscribe(
      (film: any) => {
        this.films.push(film);
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

  getFilms() {
    this.notesService.getFilms().subscribe(
      (films: Array<Film>) => {
        this.films = films;
      },
      (error) => {
        console.log('error', error);
      }
    );
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


