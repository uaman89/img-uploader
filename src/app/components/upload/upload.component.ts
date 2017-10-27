import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PATH_LOGIN} from '../../constants';
import {sha256} from 'js-sha256';
import {IImageModel, ImageStoreService} from '../../services/image-store.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public previews: IImageModel[] = [];

  constructor(private images: ImageStoreService, private auth: AuthService, private router: Router) {
  }

  // todo: detect localStorage changes

  ngOnInit() {
  }

  public onInputFileChange(event) {
    const files = [].slice.apply(event.srcElement.files);
    this.updatePreviews(files);
  }

  public updatePreviews(files) {
    files.map((f: File) => {

      if (f.type.indexOf('image') !== -1) {

        this.getPreviewSrc(f).then(
          (blob: Blob) => {

            const sha = sha256(blob);

            if (!this.previews.find(p => p.checksum === sha)) {
              this.previews.push({
                id: Date.now(), // todo: GUID?
                imageName: f.name,
                fileSize: `${f.size / 1000} kB`,
                checksum: sha,
                uploadedUser: this.auth.user.id,
                blob: blob,
              });
            }

          },
          error => {
            console.error(`at updatePreviews(): can't get preview for ${f.name}`, error);
          }
        );

      } else {
        console.warn(`${f.name} isn't an image!`);
      }

    });

  }

  public getPreviewSrc(imgFile): Promise<Blob> {

    return new Promise((resolve, reject) => {
      const fReader = new FileReader();

      fReader.onload = () => {
        resolve(fReader.result);
      };

      fReader.onerror = () => {
        reject(null);
      };

      // Read the file to DataURL format.
      try {
        fReader.readAsDataURL(imgFile);
      } catch (error) {
        console.error('at getPreviewSrc():', error);
      }
    });
  }

  public removePreview(index: number) {
    this.previews.splice(index, 1);
  }

  public clearAll() {
    this.previews = [];
  }

  public save() {
    if (!this.auth.isAuthorized) {
      this.router.navigate([PATH_LOGIN]);
      return;
    }

    this.images.upload(this.previews);

    this.clearAll();
  }
}
