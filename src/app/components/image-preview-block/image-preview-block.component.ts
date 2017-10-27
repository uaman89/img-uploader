import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IImageModel} from 'app/services/image-store.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview-block.component.html',
  styleUrls: ['./image-preview-block.component.scss']
})
export class ImagePreviewBlockComponent implements OnInit {

  @Input() public imageData = <IImageModel>{}; // workaround for https://github.com/angular/angular-cli/issues/2034#issuecomment-302666897

  /**
   * @type string
   * @default 'short'
   * There are two options: 'short' or 'full'
   */
  @Input() descrMode: string;

  @Output() onDelete: EventEmitter<null> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (!this.descrMode) {
      this.descrMode = 'short';
    }
  }

  onDeleteClick() {
    this.onDelete.emit();
  }

}
