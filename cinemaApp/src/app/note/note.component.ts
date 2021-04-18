import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotesService} from '../notes.service';
import {Note} from '../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  id:string;
  note:Note;
  constructor(private route: ActivatedRoute,private router: Router,public notesService: NotesService) { }

  ngOnInit(): void {
    this.note = {noteTitle:"", noteText:"", color:""};
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id from comp"+this.id);

    this.notesService.getNote(this.id).subscribe(
      (note:Note)=>{
        this.note = note;
      },
      (error)=>{
        console.log("error")
      }
    );
  }

  updateNote():void {
    this.notesService.updateNote(this.note).subscribe(
      (note:Note)=>{
        this.router.navigate(["/notes"]);
      },
      (error)=>{
        console.log("error update")
      }
    );
  }
}
