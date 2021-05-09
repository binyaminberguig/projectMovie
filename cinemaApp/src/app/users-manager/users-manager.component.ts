import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../movies.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UsersService} from "../users.service";


@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'login','isAdmin', 'actions'];
  users: any;


  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      (users: Array<User>) => {
        this.users = users;
      },
      (error) => {
        console.log("error", error)
      }
    )
  }

  editUser(user: number): void {
    this.router.navigate(['/user', user]);
  }

  deleteUser(user: User) {
    console.log(user);
    this.usersService.deleteUser(user._id).subscribe(
      () => {
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        this.getUsers();
      },
      (error) => {
        console.log('delete error',error);
      }
    );
  }
}
