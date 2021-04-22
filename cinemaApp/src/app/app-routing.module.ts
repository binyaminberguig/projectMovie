import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MoviesManagerComponent} from './moviesManager/moviesManager.component';
import {RegisterComponent} from './register/register.component';
import {MoviesComponent} from './movies/movies.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MovieComponent} from "./movie/movie.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie', component: MovieComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'moviesmanager', component: MoviesManagerComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
