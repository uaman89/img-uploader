import {Component} from '@angular/core';
import {UsersService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Img:Uploader';

  constructor(us: UsersService) {
    console.log(`users:`, us.users);
  }
}
