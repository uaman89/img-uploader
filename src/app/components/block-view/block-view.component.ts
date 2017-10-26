import {Component, OnDestroy, OnInit} from '@angular/core';
import {IImageModel, ImageStoreService} from 'app/services/image-store.service';
import {UsersService} from 'app/services/users.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styles: []
})
export class BlockViewComponent implements OnInit, OnDestroy {

  public images: IImageModel[] = [];
  private subscription: Subscription;

  constructor(public imageStore: ImageStoreService, private userService: UsersService) {
  }

  ngOnInit() {

    this.subscription = this.imageStore.list.subscribe(storedImages => {

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
