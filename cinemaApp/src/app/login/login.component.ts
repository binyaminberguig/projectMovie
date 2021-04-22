import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = '';
  password: any = '';
  alerts: Alert[];

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  submit(): any{
    this.authService.login(this.login, this.password).subscribe((userInfo: any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(['/movies']);
      },
      (err) => {
        this.alerts =  [{
          type: 'danger',
          message: 'Login or password incorrect',
        }];
        console.log('error', err);
      });
  }
}
