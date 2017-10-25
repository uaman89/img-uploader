import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NavigationEnd, Router, Event} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Img:Uploader';

  constructor(public auth: AuthService, private router: Router) {
    if (!auth.isAuthorized) {
      router.navigate(['login']);
    } else {

      router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/') {
            router.navigate(['view/blocks']);
          }
        }
      });

    }
  }

  public logout(e) {
    e.preventDefault();
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
