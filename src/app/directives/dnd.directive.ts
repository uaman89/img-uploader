import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';

@Directive({
  selector: '[appFilesDnd]'
})
export class DndDirective {
  @Input() private allowedExtensions: Array<string> = [];
  @Output() private onFilesChanged: EventEmitter<File[]> = new EventEmitter();

  @HostBinding('class.drag-over') isDragOver = false;
  @HostBinding('class.drag-leave') isDragLeave = false;
  @HostBinding('class.drag-drop') isDragDrop = false;

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // todo: remove copy-paste
    this.isDragOver = true;
    this.isDragLeave = false;
    this.isDragDrop = false;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = false;
    this.isDragLeave = true;
    this.isDragDrop = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = false;
    this.isDragLeave = false;
    this.isDragDrop = true;

    const files = evt.dataTransfer.files;

    const valid_files: Array<File> = [];

    if (files.length > 0) {
      for (const file of files) {

        // todo: check by type
        // console.log('Type: ', file.type);
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowedExtensions.indexOf(ext) !== -1) {
          valid_files.push(file);
        }
      }
      this.onFilesChanged.emit(valid_files);
    }

  }

}
