import {Component, OnInit} from '@angular/core';
import {IImageModel, ImageStoreService} from '../../services/image-store.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {

  public images: IImageModel[] = [];

  constructor(public imageStore: ImageStoreService, private userService: UsersService) {
  }

  ngOnInit() {
    const savedImages = this.imageStore.getFromStore();

    this.images = savedImages.map(img => {

      this.userService.getUsers().then(list => {
        img['uploadUserName'] = (list.find(u => u.id === img.uploadedUser)).name;
      });

      return img;
    });
  }

}
