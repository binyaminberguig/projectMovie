import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
connectedUser: any = null;
connectedAdmin: any = null;
  constructor(private http: HttpClient){
    this.isLogged();
  }

  login(login, password): Observable<any>{
    return this.http.post('http://localhost:3000/login', {login, password}, {withCredentials: true});
  }

  logout(): Observable<any>{
    return this.http.get('http://localhost:3000/logout', {withCredentials: true});
  }

  register(login, password, fullName): Observable<any>{
    return this.http.post('http://localhost:3000/register', {login, password, fullName}, {withCredentials: true});
  }

  isLogged(): any{
    this.http.get('http://localhost:3000/isLogged', {withCredentials: true}).subscribe(
      (connectedUser) => {
        this.connectedUser = connectedUser;
        console.log(this.connectedUser);
        console.log('connected');
      },
      (err) => {
        console.log('not connected', err);
      }
    );
  }
}
