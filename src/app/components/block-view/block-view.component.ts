import {Component} from '@angular/core';
import {ViewService} from '../../services/view.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  providers: [ViewService]
})
export class BlockViewComponent {

  constructor(public view: ViewService) {
  }

}
