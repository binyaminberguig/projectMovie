import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../movies.service';
import {Movie} from '../models/movie';
import {Reservation} from '../models/reservation';
import {AuthService} from '../auth.service';
import {ReservationsService} from '../reservation.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie>;
  reservation: Array<Reservation>;
  nbPlace: any;
  constructor(private route: ActivatedRoute, private router: Router,
              public moviesService: MoviesService, public authService: AuthService, public reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.getMovies();
  }


  getMovies(): any {
    this.moviesService.getMovies().subscribe(
      (movies: Array<Movie>) => {
        this.movies = movies;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  reserve(movie: Movie): any {

    const reservation: Reservation = new Reservation();
    reservation._id = Math.random();
    reservation.idFilm = movie._id;
    reservation.idUser = this.authService.connectedUser.id;
    reservation.nbPlace = movie.nbPlaceRes;
    const date = new Date(movie.dateRes);
    date.setDate(date.getDate() + 1);
    reservation.date = date;

    this.reservationsService.addReservation(reservation).subscribe(
      (resa: Array<Reservation>) => {
        this.reservation = resa;
        movie.nbPlace -= movie.nbPlaceRes;
        this.moviesService.updateMovie(movie).subscribe(
          () => {
            this.router.navigate(['/reservation']);
          },
          (error) => {
            console.log('error update', error);
          }
        );
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

}
