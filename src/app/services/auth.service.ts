import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface UserCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  private users: any[];

  constructor(private http: HttpClient) {

    http.get('/assets/users.json').subscribe(
      res => {
        this.users = res['users'];
      },
      error => {
        console.error('at auth_service:', error);
      }
    );

  }

  private getUsers() {
    if (this.users !== undefined) {
      return this.users;
    }
  }

  public login(user: UserCredentials) {

  }

  public logout() {

  }

}
