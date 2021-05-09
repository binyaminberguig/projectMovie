import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MoviesManagerComponent} from './moviesManager/moviesManager.component';
import {RegisterComponent} from './register/register.component';
import {MoviesComponent} from './movies/movies.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MovieComponent} from "./movie/movie.component";
import {UsersManagerComponent} from "./users-manager/users-manager.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie', component: MovieComponent},
  {path: 'user', component: UserComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'moviesManager', component: MoviesManagerComponent},
  {path: 'users-manager', component: UsersManagerComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
