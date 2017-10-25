import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  private users: Promise<any[]>;

  constructor(private http: HttpClient) {
    this.load();
  }

  public getUsers() {
    return this.users;
  }

  private load() {
    console.log('load users!');
    this.users = this.http.get('/assets/users.json').toPromise().then(
      res => {
        this.users = res['users'];
        return this.users;
      },
      error => {
        console.error('at auth_service:', error);
        return Error(`can't load users`);
      }
    );

  }

}
