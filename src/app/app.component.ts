import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NavigationEnd, Router, Event} from '@angular/router';
import {PATH_BLOCKS, PATH_LOGIN} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Img:Uploader';

  constructor(public auth: AuthService, private router: Router) {
    if (!auth.isAuthorized) {
      router.navigate([PATH_LOGIN]);
    } else {

      router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/') {
            router.navigate([PATH_BLOCKS]);
          }
        }
      });

    }
  }

  public logout(e) {
    e.preventDefault();
    this.auth.logout();
    this.router.navigate([PATH_LOGIN]);
  }
}
