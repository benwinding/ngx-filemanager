import { Component, Input, Output, EventEmitter } from '@angular/core';
import { guesser } from '../utils/file-icon-guesser';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-file-details',
  template: `
    <div class="details-container">
      <div *ngIf="!hasInput" class="none-selected">
        <h2>No item selected ...</h2>
      </div>
      <div *ngIf="hasInput && !isFile">
        <span class="flex-r center">
          <h2>Directory Details</h2>
          <button
            mat-mini-fab
            color="warn"
            (click)="this.clickedDelete.emit(file)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </span>
        <h5>Name</h5>
        <h6>{{ file.name }}</h6>
        <h5>Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5>Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <h5>Permissions</h5>
        <h6>{{ file.rights }}</h6>
        <h5>Type</h5>
        <h6>Directory</h6>
      </div>
      <div *ngIf="hasInput && isFile">
        <span class="flex-r center">
          <h2>File Details</h2>
          <span>
            <button
              mat-mini-fab
              color="warn"
              (click)="this.clickedDelete.emit(file)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </span>
        </span>
        <h5>Name</h5>
        <h6>{{ file.name }}</h6>
        <h5>Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5>Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <h5>Permissions</h5>
        <h6>{{ file.rights }}</h6>
        <h5>Type</h5>
        <h6 class="capitalize">{{ getFileType(file.name) }}</h6>
        <div *ngIf="isImage">
          <h5>Preview</h5>
          <a [href]="getImageUrl()" target="_blank">
            <img [src]="getImageUrl()" />
          </a>
        </div>
        <button
          mat-mini-fab
          color="primary"
          (click)="this.clickedDownload.emit(file)"
        >
          <mat-icon>file_download</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .center {
        align-items: center;
      }
      .flex-r {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .details-container {
        margin: 8px;
      }
      .none-selected {
        color: grey;
        text-align: center;
        width: 100%;
        margin-top: 100px;
      }
      h2,
      h5,
      h6 {
        font-family: sans-serif;
      }
      h5 {
        margin: 0px;
      }
      h6 {
        margin: 0px;
        font-size: 1em;
        overflow-wrap: break-word;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .capitalize {
        text-transform: capitalize;
      }
      img {
        width: 100%;
      }
    `
  ]
})
export class FileDetailsComponent {
  @Input()
  file: ResFile;
  @Output()
  clickedDownload = new EventEmitter<ResFile>();
  @Output()
  clickedDelete = new EventEmitter<ResFile>();

  getFileType(fileName: string) {
    return guesser.getFileIconName(fileName);
  }

  get hasInput() {
    return !!this.file;
  }
  get isFile() {
    return this.file.type === 'file';
  }
  get isImage() {
    return guesser.getFileIconName(this.file.name) === 'image';
  }

  getImageUrl() {
    return 'https://upload.wikimedia.org/wikipedia/commons/8/85/Exponential_Function_%28Abs_Imag_Part_at_Infinity%29_Density.png';
    // return this.file.fullPath;
  }
}
