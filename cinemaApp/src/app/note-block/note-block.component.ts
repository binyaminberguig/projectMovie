import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Note} from '../models/note';
import {NotesService} from "../notes.service";


@Component({
  selector: 'app-note-block',
  templateUrl: './note-block.component.html',
  styleUrls: ['./note-block.component.scss']
})
export class NoteBlockComponent implements OnInit {
noteStatus: String = 'view';

@Input() note: Note;
@Output() deleteNote = new EventEmitter<Note>();
@Output() editNote = new EventEmitter<Note>();
  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
  }

  deleteNoteEvent():void {
    this.deleteNote.emit(this.note);
  }

updateNote():void{
    this.noteStatus = 'loading';
    this.notesService.updateNote(this.note).subscribe(
      (note:Note)=>{
        this.noteStatus = 'view';
      },
      (err)=>{
        this.noteStatus = 'error';
        console.log("Note update error");
      }
    )
}
}
