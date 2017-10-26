import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IImageModel} from '../../services/image-store.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview-block.component.html',
  styleUrls: ['./image-preview-block.component.scss']
})
export class ImagePreviewBlockComponent implements OnInit {

  /**
   * @type string
   * @default 'short'
   * There are two options: 'short' or 'full'
   */
  @Input() descrMode: string;

  @Input() imageData: IImageModel;

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
