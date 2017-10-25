import {Injectable} from '@angular/core';
import {UsersService} from './users.service';

export interface IUserCredentials {
  email: string;
  password: string;
}

interface IUser {
  'id': number;
  'name': string;
  'email': string;
  'password': string;
}

@Injectable()
export class AuthService {

  public user: IUser;

  public get isAuthorized() {
    return !!this.user;
  }

  constructor(private users: UsersService) {
    this.user = JSON.parse(localStorage.getItem('authorizedUser'));
  }

  public login(credentials: IUserCredentials) {

    return this.users.getUsers().then(users => {

      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

      if (!!user) {
        this.user = user;
        localStorage.setItem('authorizedUser', JSON.stringify(user));
      } else {
        this.logout();
      }

      return this.isAuthorized;

    });
  }

  public logout() {
    this.user = null;
    localStorage.removeItem('authorizedUser');
  }

}
