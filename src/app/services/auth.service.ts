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
    this.isAuthorized = localStorage.getItem('authorizedUser') === 'true';
  }

  public login(credentials: IUserCredentials) {

    return this.users.getUsers().then(users => {

      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

      if (!!user) {
        this.isAuthorized = true;
        localStorage.setItem('authorizedUser', user.id);
      } else {
        this.logout();
      }

      return this.isAuthorized;

    });
  }

  public logout() {
    this.isAuthorized = false;
    localStorage.removeItem('authorizedUser');
  }

}
