import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public previews: Set<File> = new Set([]);

  constructor() {
  }

  ngOnInit() {
  }

  public updatePreviews(files) {
    // todo: detect duplicates
    files.map(f => this.previews.add(f));
  }

  public removePreview(preview) {
    this.previews.delete(preview);
  }

  public clearAll(){
    this.previews.clear();
  }

  save() {

  }
}
