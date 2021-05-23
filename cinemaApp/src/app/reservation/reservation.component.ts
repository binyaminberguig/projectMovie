import { Component, OnInit } from '@angular/core';
import {Movie} from '../models/movie';
import {MoviesService} from '../movies.service';
import {Reservation} from '../models/reservation';
import {ReservationsService} from '../reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
  displayedColumns: string[] = [ 'title', 'nbPlace', 'date', 'actions'];
  img: any;
  accept = 'image/png, image/jpeg';
  reservation: any;

  constructor(public moviesService: MoviesService, public reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation(): any {
    this.reservationsService.getReservations().subscribe(
      (reservation: Array<Reservation>) => {
        this.reservation = reservation;
        this.reservation.forEach(element => {
          this.moviesService.getMovie(element.idFilm).subscribe(
            (movie: Movie) => {
              element.idFilm = movie._id;
              element.title = movie.title;
            },
            (error) => {
              console.log('error', error);
            }
          );
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  deleteReservation(reservation: Reservation): any {

    this.reservationsService.deleteReservation(reservation._id).subscribe(
      () => {
        this.moviesService.getMovie(reservation.idFilm).subscribe(
          (movie: Movie) => {
            movie.nbPlace += reservation.nbPlace;
            this.moviesService.updateMovie(movie).subscribe(
              () => {
                const index = this.reservation.indexOf(reservation);
                this.reservation.splice(index, 1);
                this.getReservation();
              },
              (error) => {
                console.log('error update', error);
              }
            );
          },
          (error) => {
            console.log('error update', error);
          }

        );
      },
      (error) => {
        console.log('delete error', error);
      }
    );
  }
}
