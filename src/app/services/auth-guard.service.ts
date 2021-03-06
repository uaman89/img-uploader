import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

const clr = 'background: olive; color: white';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {
    console.log('%c auth.isAuthorized:', clr, auth.isAuthorized);

  }

  public canActivate(): boolean {
    return this.auth.isAuthorized;
  }

}
