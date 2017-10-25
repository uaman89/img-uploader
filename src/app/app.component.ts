import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Img:Uploader';

  constructor(public auth: AuthService, router: Router) {
    if (!auth.isAuthorized){
      router.navigate(['login']);
    } else {
      router.navigate(['view/block']);
    }
  }
}
