import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
  public previews: Set<IImageModel> = new Set([]);

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  public updatePreviews(files) {
    // todo: detect duplicates
    files.map((f: File) => this.previews.add({
      id: Date.now(),
      imageName: f.name,
      fileSize: `${f.size / 1000} kB`,
      checksum: `getChecksum()`,
      uploadedUser: this.auth.user.id
    }));
  }

  public removePreview(preview) {
    this.previews.delete(preview);
  }

  public clearAll() {
    this.previews.clear();
  }

  save() {
    if (!this.auth.isAuthorized) {
      this.router.navigate(['/login']);
      return;
    }
    let uploadedImages: IImageModel[] = JSON.parse(localStorage.getItem('uploadedImages'));
    if (!(uploadedImages instanceof Array)) {
      uploadedImages = [];
    }
    this.previews.forEach(value => uploadedImages.push(value));
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
    this.clearAll();
  }
}
