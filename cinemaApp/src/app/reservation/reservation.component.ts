import { Component, OnInit } from '@angular/core';
import {Movie} from "../models/movie";
import {MoviesService} from "../movies.service";
import {Reservation} from "../models/reservation";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
  displayedColumns: string[] = [ 'title', 'nbPlace','date','actions'];
  img: any;
  accept="image/png, image/jpeg"
  reservation: any;

  constructor(public moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation() {
    this.moviesService.getReservations().subscribe(
      (reservation: Array<Reservation>) => {
        this.reservation = reservation;
        this.reservation.forEach(element => {
          this.moviesService.getMovie(element.idFilm).subscribe(
            (movie: Movie) => {
              element.idFilm = movie._id;
              element.title = movie.title;
            },
            (error) => {
              console.log("error", error)
            }
          )
        });
      },
      (error) => {
        console.log("error", error)
      }
    )
  }

  deleteReservation(reservation: Reservation) {

    this.moviesService.deleteReservation(reservation._id).subscribe(
      () => {
        this.moviesService.getMovie(reservation.idFilm).subscribe(
          (movie:Movie)=>{
            movie.nbPlace += reservation.nbPlace; 
            this.moviesService.updateMovie(movie).subscribe(
              (movies:Movie)=>{                   
                const index = this.reservation.indexOf(reservation);
                this.reservation.splice(index, 1);
                this.getReservation();
              },
              (error)=>{
                console.log("error update", error)
              }
            )
          },
          (error)=>{
            console.log("error update", error)
          }
          
        )
      },
      (error) => {
        console.log('delete error',error);
      }
    );
  }
}
