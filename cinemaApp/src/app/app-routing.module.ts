import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotesComponent} from './notes/notes.component';
import {RegisterComponent} from './register/register.component';
import {CinemaComponent} from './cinema/cinema.component';
import {ReservationComponent} from './reservation/reservation.component';
import {NoteComponent} from "./note/note.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cinema', component: CinemaComponent},
  {path: 'note', component: NoteComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
