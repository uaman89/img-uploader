import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NavigationEnd, Router, Event} from '@angular/router';
import {PATH_BLOCKS, PATH_LOGIN} from './constants';
import {ImageStoreService} from './services/image-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Img:Uploader';

  constructor(public auth: AuthService, private router: Router, private imageStore: ImageStoreService) {
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
    this.imageStore.clear();
    this.router.navigate([PATH_LOGIN]);
  }
}
