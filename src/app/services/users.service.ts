import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  private cachedUsers: any[];
  private loadPromise: Promise<any[]>;

  constructor(private http: HttpClient) {
    this.load();
  }

  public getUsers() {

    if (!this.cachedUsers) {
      return this.loadPromise;
    } else {
      return Promise.resolve(this.cachedUsers);
    }

  }

  private load() {

    this.cachedUsers = null;

    this.loadPromise = this.http.get('/assets/users.json').toPromise().then(
      res => {
        this.cachedUsers = res['Users'];
        return this.cachedUsers;
      },
      error => {
        console.error('at auth_service:', error);
        return Error(`can't load users`);
      }
    );

  }

}
