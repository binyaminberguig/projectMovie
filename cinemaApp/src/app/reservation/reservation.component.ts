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
  displayedColumns: string[] = ['position', 'title', 'nbPlace','date','actions'];
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
        console.log(this.reservation);
      },
      (error) => {
        console.log("error", error)
      }
    )
  }
}
