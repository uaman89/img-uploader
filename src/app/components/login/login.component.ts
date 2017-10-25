import {Component, OnInit} from '@angular/core';
import {IUserCredentials} from '../../services/auth.service';

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

  constructor() {
  }

  ngOnInit() {
  }

}
