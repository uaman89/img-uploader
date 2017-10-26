import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {KEY_UPLOADED_IMAGES, PATH_LOGIN} from '../../constants';
import {sha256} from 'js-sha256';

interface IImageModel {
  'id': number;
  'imageName': string;
  'fileSize': string; // example 114.6 kB
  'checksum': string; // SHA256
  'uploadedUser': number; // user id
}

interface IPreviewItem {
  file: File;
  src: Blob;
};

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public previewKeys: IterableIterator<string>;
  public previews: Map<string, IPreviewItem>;

  constructor(private auth: AuthService, private router: Router) {
  }

  // todo: detect localStorage changes

  ngOnInit() {
    this.previews = new Map();
  }

  public updatePreviews(files) {
    files.map((f: File) => {

      if (f.type.indexOf('image') !== -1) {

        this.getPreviewSrc(f).then(
          (blob: Blob) => {

            const sha = sha256(blob);

            this.previews.set(sha, {
              file: f,
              src: blob
            });

            // todo: think about this...
            this.previewKeys = this.previews.keys();

          },
          error => {
            console.error(`at updatePreviews(): can't get preview for ${f.name}`);
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

  public removePreview(key) {
    this.previews.delete(key);
  }

  public clearAll() {
    this.previews.clear();
  }

  save() {
    if (!this.auth.isAuthorized) {
      this.router.navigate([PATH_LOGIN]);
      return;
    }
    let imagesToUpload: IImageModel[] = JSON.parse(localStorage.getItem(KEY_UPLOADED_IMAGES));
    if (!(imagesToUpload instanceof Array)) {
      imagesToUpload = [];
    }

    this.previews.forEach((p, shaKey) => imagesToUpload.push(<IImageModel>{
      id: Date.now(),
      imageName: p.file.name,
      fileSize: `${p.file.size / 1000} kB`,
      checksum: shaKey,
      uploadedUser: this.auth.user.id,
    }));

    localStorage.setItem(KEY_UPLOADED_IMAGES, JSON.stringify(imagesToUpload));
    this.clearAll();
  }
}
