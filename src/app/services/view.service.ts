import {Injectable} from '@angular/core';
import {IImageModel, ImageStoreService} from './image-store.service';
import {Subscription} from 'rxjs/Subscription';
import {UsersService} from './users.service';

@Injectable()
export class ViewService {

  public images: IImageModel[] = [];
  private subscription: Subscription;

  constructor(public imageStore: ImageStoreService, private userService: UsersService) {

    this.subscription = this.imageStore.list.subscribe(storedImages => {

      this.images = storedImages.map(img => {
        this.userService.getUsers().then(list => {
          img['uploadUserName'] = (list.find(u => u.id === img.uploadedUser)).name;
        });
        return img;
      });

    });

  }

  public delImage(index) {
    this.imageStore.deleteImage(this.images[index].checksum);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
