import { Component, OnInit } from '@angular/core';
import {NotesService} from '../notes.service';
import {Note} from "../models/note";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteTitle: string;
  noteText: string;
  colors: Array<any> = ['red', 'yellow', 'blue'];
  notes: any;

  constructor(public notesService:NotesService, private router:Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  addNote(): void {

    var note: Note = new Note();
    note._id = Math.random(),
      note.noteTitle = this.noteTitle,
      note.noteText = this.noteText,
      note.color = this.colors[Math.floor(Math.random() * Math.floor(2))]

    this.noteTitle = "";
    this.noteText = "";
    this.notesService.addNote(note).subscribe(
      (note: any) => {
        this.notes.push(note);
      },
      (error) => {
        console.log("error")
      }
    )
  }


  editNote(noteId: number): void {
    this.router.navigate(["/note", noteId]);
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (notes: Array<Note>) => {
        this.notes = notes;
      },
      (error) => {
        console.log("error")
      }
    )
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note._id).subscribe(
      () => {
        let index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
      },
      (error) => {
        console.log("delete error")
      }
    )
  }
}
