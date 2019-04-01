import { Component, Input } from '@angular/core';
import { getFileIconName } from '../utils/file-icon-guesser';
import { ResFile } from 'ngx-filemanager-core/public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-file-details',
  template: `
    <div class="details-container">
      <div *ngIf="!hasInput" class="none-selected">
        No item selected ...
      </div>
      <div *ngIf="hasInput && !isFile">
        <h2>Directory Details</h2>
        <h5>Name</h5>
        <h6>{{ file.name }}</h6>
        <h5>Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5>Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <h5>Type</h5>
        <h6>Directory</h6>
      </div>
      <div *ngIf="hasInput && isFile">
        <h2>File Details</h2>
        <h5>Name</h5>
        <h6>{{ file.name }}</h6>
        <h5>Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5>Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <h5>Type</h5>
        <h6 class="capitalize">{{ getFileType(file.name) }}</h6>
        <div *ngIf="isImage">
          <h5>Preview</h5>
          <a [href]="getImageUrl()" target="_blank">
            <img [src]="getImageUrl()" />
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .details-container {
        margin: 8px;
      }
      .none-selected {
        font-size: 1.5em;
        color: grey;
        text-align: center;
        width: 100%;
        margin-top: 100px;
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

  getFileType(fileName: string) {
    return getFileIconName(fileName);
  }

  get hasInput() {
    return !!this.file;
  }
  get isFile() {
    return this.file.type === 'file';
  }
  get isImage() {
    return getFileIconName(this.file.name) === 'image';
  }

  getImageUrl() {
    return 'https://upload.wikimedia.org/wikipedia/commons/8/85/Exponential_Function_%28Abs_Imag_Part_at_Infinity%29_Density.png';
    // return this.file.fullPath;
  }
}
