import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  constructor(private http: HttpClient) { }

  addReservation(reservation): any {
    return this.http.post('http://localhost:3000/reservation', reservation);
  }

  getReservations(): any{
    return this.http.get('http://localhost:3000/reservation');
  }

  deleteReservation(resaId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/reservations/' + resaId);
  }
}

