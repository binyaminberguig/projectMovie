import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = '';
  password: any = '';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  submit(): any{
    this.authService.login(this.login, this.password).subscribe((userInfo: any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(['/movies']);
      },
      (err) => {
        console.log('error', err);
      });
  }
}
