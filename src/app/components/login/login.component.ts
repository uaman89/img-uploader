import {Component, OnInit} from '@angular/core';
import {UserCredentials} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: UserCredentials = {
    email: '',
    password: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

}
