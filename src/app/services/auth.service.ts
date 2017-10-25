import {Injectable} from '@angular/core';
import {UsersService} from './users.service';

interface UserCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  public isAuthorized = false;

  constructor(private users: UsersService) {
  }

  public login(user: UserCredentials) {
    this.users.getUsers().then(users => {
      const isUserExists = !!users.find(u => u.email === user.email && u.password === user.password);

      if (isUserExists) {
        this.isAuthorized = true;
      } else {
        this.isAuthorized = false;
      }

      return this.isAuthorized;
    });
  }

  public logout() {
    this.isAuthorized = false;
  }

}
