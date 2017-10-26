import {Injectable} from '@angular/core';
import {KEY_UPLOADED_IMAGES} from '../constants';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface IImageModel {
  'id': number;
  'imageName': string;
  'fileSize': string; // example 114.6 kB
  'checksum': string; // SHA256
  'uploadedUser': number; // user id
  'blob': Blob; // image data
}


@Injectable()
export class ImageStoreService {

  public list: BehaviorSubject<IImageModel[]> = new BehaviorSubject([]);

  constructor() {

    this.list.next(this.getFromStore());

  }

  public getFromStore(): IImageModel[] {
    let uploadedImages: IImageModel[] = JSON.parse(localStorage.getItem(KEY_UPLOADED_IMAGES));
    if (!(uploadedImages instanceof Array)) {
      uploadedImages = [];
    }
    return uploadedImages;
  }

  public upload(images: IImageModel[]) {

    const savedImages = this.getFromStore();
    const checksumList = savedImages.map((img: IImageModel) => img.checksum);

    const imagesToUpload = images.filter((img: IImageModel) => {
      return checksumList.indexOf(img.checksum) === -1;
    });

    this.writeToStore(imagesToUpload.concat(savedImages));
  }

  private writeToStore(images) {
    localStorage.setItem(KEY_UPLOADED_IMAGES, JSON.stringify(images));
    this.list.next(images);
  }

  public deleteImage(checksum) {

    const images = this.getFromStore().filter(i => i.checksum !== checksum);
    this.writeToStore(images);

  }

  public clear() {
    this.writeToStore([]);
  }

}
