import {Injectable} from '@angular/core';
import {KEY_UPLOADED_IMAGES} from '../constants';

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

  constructor() {
  }

  public getFromStore(): IImageModel[] {
    let uploadedImages: IImageModel[] = JSON.parse(localStorage.getItem(KEY_UPLOADED_IMAGES));
    if (!(uploadedImages instanceof Array)) {
      uploadedImages = [];
    }
    return uploadedImages;
  }

  public saveToStore(images: IImageModel[]) {

    const savedImagesChecksum = this.getFromStore().map((img: IImageModel) => img.checksum);

    const imagesToUpload = images.filter((img: IImageModel) => {
      return savedImagesChecksum.indexOf(img.checksum) === -1;
    });

    localStorage.setItem(KEY_UPLOADED_IMAGES, JSON.stringify(imagesToUpload));
  }

}
