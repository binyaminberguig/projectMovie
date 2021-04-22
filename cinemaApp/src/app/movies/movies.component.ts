import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../movies.service';
import {Movie} from '../models/movie';
import {Reservation} from "../models/reservation";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie>
  reservation: Array<Reservation>;
  nbPlace: any;
  constructor(private route: ActivatedRoute,private router: Router,public moviesService: MoviesService, public authService: AuthService) { }



  ngOnInit(): void {
    this.getMovies();
  }


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

  reserve(idMovie) {
    const reservation: Reservation = new Reservation();
    reservation._id = Math.random(),
    reservation.idFilm = idMovie;
    reservation.idUser = this.authService.connectedUser.id;;
    reservation.nbPlace = this.nbPlace;
    this.moviesService.addReservation(reservation).subscribe(
      (reservation: Array<Reservation>) => {
        this.reservation = reservation;
        console.log(this.reservation);
      },
      (error) => {
        console.log("error")
      }
    )
  }
}
