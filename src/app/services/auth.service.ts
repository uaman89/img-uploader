import {Injectable} from '@angular/core';
import {UsersService} from './users.service';

export interface IUserCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  public isAuthorized = false;

  constructor(private users: UsersService) {
    this.isAuthorized = localStorage.getItem('isAuthorized') === 'true';
  }

  public login(user: IUserCredentials) {

    return this.users.getUsers().then(users => {

      const isUserExists = !!users.find(u => u.email === user.email && u.password === user.password);

      if (isUserExists) {
        this.isAuthorized = true;
        localStorage.setItem('isAuthorized', this.isAuthorized.toString());
      } else {
        this.logout();
      }

      return this.isAuthorized;

    });
  }

  public logout() {
    this.isAuthorized = false;
    localStorage.removeItem('isAuthorized');
  }

}
