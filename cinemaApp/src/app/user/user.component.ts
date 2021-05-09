import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id:any;
  user:User;

  constructor(private route: ActivatedRoute, private router: Router, public usersService:UsersService) { }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.paramMap.get('_id');
    this.usersService.getUser(this.id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.log("error", error)
      }
    )

  }

  updateUser():void {
    this.usersService.updateUser(this.user).subscribe(
      (user:User)=>{
        this.router.navigate(["/users-manager"]);
      },
      (error)=>{
        console.log("error update", error)
      }
    );
  }
}
