import {Component, OnInit} from '@angular/core';
import {IImageModel, ImageStoreService} from '../../services/image-store.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styles: []
})
export class BlockViewComponent implements OnInit {

  public images: IImageModel[] = [];

  constructor(public imageStore: ImageStoreService, private userService: UsersService) {
  }

  ngOnInit() {

    this.imageStore.list.subscribe(storedImages => {

      this.images = storedImages.map(img => {
        this.userService.getUsers().then(list => {
          img['uploadUserName'] = (list.find(u => u.id === img.uploadedUser)).name;
        });
        return img;
      });

    });

  }

  delImage(index) {
    this.imageStore.deleteImage(this.images[index].checksum);
  }

}
