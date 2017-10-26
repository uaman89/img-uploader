import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {KEY_UPLOADED_IMAGES, PATH_LOGIN} from '../../constants';

interface IImageModel {
  'id': number;
  'imageName': string;
  'fileSize': string; // example 114.6 kB
  'checksum': string; // SHA256
  'uploadedUser': number; // user id
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public previews: Set<{ file: File, src: Blob }> = new Set([]);

  constructor(private auth: AuthService, private router: Router) {
  }

  // todo: detect localStorage changes

  ngOnInit() {
  }

  public updatePreviews(files) {
    // todo: detect duplicates
    files.map((f: File) => {

      if (f.type.indexOf('image') !== -1) {

        this.getPreviewSrc(f).then(
          (blob: Blob) => {
            this.previews.add({
              file: f,
              src: blob
            });
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

  public removePreview(preview) {
    this.previews.delete(preview);
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
    this.previews.forEach(p => imagesToUpload.push(<IImageModel>{
      id: Date.now(),
      imageName: p.file.name,
      fileSize: `${p.file.size / 1000} kB`,
      checksum: `getChecksum()`,
      uploadedUser: this.auth.user.id,
    }));
    localStorage.setItem(KEY_UPLOADED_IMAGES, JSON.stringify(imagesToUpload));
    this.clearAll();
  }
}
