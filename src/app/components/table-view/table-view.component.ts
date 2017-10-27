import {Component} from '@angular/core';
import {ViewService} from '../../services/view.service';
import {IImageModel} from '../../services/image-store.service';

class Modal {
  isShow = false;
  image: IImageModel;

  open(image) {
    this.image = image;
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [ViewService]
})
export class TableViewComponent {

  public modal: Modal = new Modal;

  constructor(public view: ViewService) {
  }

}
