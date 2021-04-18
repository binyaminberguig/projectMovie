import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
connectedUser:any = null;
constructor(private http: HttpClient){
  this.isLogged();
}

login(login,password):Observable<any>{
  return this.http.post("http://localhost:3000/login",{login:login,password:password},{withCredentials:true})
}

logout():Observable<any>{
  return this.http.get("http://localhost:3000/logout",{withCredentials:true});
}

register(login:any,password:any,fullName:any):Observable<any>{
  return this.http.post("http://localhost:3000/register",{login:login,password:password,fullName:fullName},{withCredentials:true})
}

isLogged(){
  this.http.get("http://localhost:3000/isLogged",{withCredentials:true}).subscribe(
    (connectedUser)=>{
      this.connectedUser = connectedUser;
      console.log(this.connectedUser);
      console.log("connected");
    },
    (err)=>{
      console.log("not connected", err);
    }
  )
}

}
