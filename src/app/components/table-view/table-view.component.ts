import {Component} from '@angular/core';
import {ViewService} from '../../services/view.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [ViewService]
})
export class TableViewComponent {

  constructor(public view: ViewService) {
  }

}
