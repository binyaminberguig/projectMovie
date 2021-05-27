import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout().subscribe(() =>
    {
      this.authService.connectedUser = false;
      this.router.navigate(['']);
    },
      () =>
      {

      });
  }
}
