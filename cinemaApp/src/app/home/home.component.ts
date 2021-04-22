import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  login: any = '';
  password: any = '';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  submit(): any{
    this.authService.login(this.login, this.password).subscribe((userInfo: any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(['/notes']);
      },
      (err) => {
        console.log('error', err);
      });
  }
}
