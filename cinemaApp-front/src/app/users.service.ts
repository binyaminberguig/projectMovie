import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

  getUsers(): any{
    return this.http.get('http://localhost:3000/users');
  }

  getUser(userId: any): Observable<any>{
    return this.http.get('http://localhost:3000/user/' + userId);
  }

  deleteUser(userId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/users/' + userId);
  }

  updateUser(user): any{
    return this.http.put('http://localhost:3000/users/' + user._id, user);
  }
}
