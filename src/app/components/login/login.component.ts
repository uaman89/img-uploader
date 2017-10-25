import {Component, OnInit} from '@angular/core';
import {AuthService, IUserCredentials} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: IUserCredentials = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.user).then(result => {
      if (result) {
        this.router.navigate(['view/blocks']);
      } else {
        alert('Wrong user!');
      }
    });
  }
}
