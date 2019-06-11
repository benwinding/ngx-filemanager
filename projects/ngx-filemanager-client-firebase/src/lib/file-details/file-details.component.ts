import { Component, Input, Output, EventEmitter } from '@angular/core';
import { guesser } from '../utils/file-icon-guesser';
import { FileSystemProvider, CoreTypes } from 'ngx-filemanager-core';
import { promiseDelay } from '../utils/delayer';
import { LoggerService } from '../logging/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-file-details',
  template: `
    <div class="details-container p5">
      <div *ngIf="!hasInput" class="none-selected">
        <h2>No item selected ...</h2>
      </div>
      <div *ngIf="hasInput">
        <span class="flex-row space-between align-center">
          <h2 *ngIf="isFile">File Details</h2>
          <h2 *ngIf="!isFile">Directory Details</h2>
          <span>
            <button
              mat-mini-fab
              color="warn"
              class="has-pointer"
              (click)="this.clickedDelete.emit(file)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </span>
        </span>
        <h5>Name</h5>
        <span class="flex-row align-center">
          <h6 class="filename">{{ file.name }}</h6>
          <button
            mat-mini-fab
            color="primary"
            class="has-pointer"
            (click)="this.clickedRename.emit(file)"
          >
            <mat-icon>border_color</mat-icon>
          </button>
        </span>
        <h5>Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5>Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <span class="flex-row align-center">
          <h5>Permissions</h5>
          <button
            mat-mini-fab
            color="primary"
            class="has-pointer"
            (click)="this.clickedSetPermissions.emit(file)"
          >
            <mat-icon>lock_outline</mat-icon>
          </button>
        </span>
        <div>
          <h6 *ngIf="others">Anyone Can</h6>
          <p>
            {{ others }}
          </p>
          <h6 *ngIf="readers && readers.length">Readers</h6>
          <p *ngFor="let entity of readers">
            {{ entity | json }}
          </p>
          <h6 *ngIf="writers && writers.length">Writers</h6>
          <p *ngFor="let entity of writers">
            {{ entity | json}}
          </p>
        </div>
        <h5>Full Path</h5>
        <h6>{{ file.fullPath }}</h6>
        <h5>Type</h5>
        <h6 *ngIf="!isFile">Directory</h6>
        <h6 *ngIf="isFile" class="capitalize">{{ getFileType(file.name) }}</h6>
        <button
          *ngIf="isFile"
          mat-mini-fab
          color="primary"
          class="has-pointer"
          (click)="this.clickedDownload.emit(file)"
        >
          <mat-icon>open_in_new</mat-icon>
        </button>
        <div class="preview" [class.hidden]="!(isImage && imageUrl)">
          <h5>Preview</h5>
          <div class="has-pointer" (click)="this.clickedDownload.emit(file)">
            <img *ngIf="imageUrl" [src]="imageUrl" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .filename {
        margin: 0px;
        padding-right: 10px;
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
      img {
        max-width: 100%;
        max-height: 400px;
      }
      .preview {
        opacity: 1;
        transition: opacity 1s;
      }
      .hidden {
        opacity: 0;
        height: 0px;
        overflow: hidden;
      }
    `
  ],
  styleUrls: ['../shared-utility-styles.scss']
})
export class FileDetailsComponent {
  imageUrl: string;

  _file: CoreTypes.ResFile;
  @Input()
  set file(newFile) {
    this.logger.info('file-details: set file', {newFile});
    this._file = newFile;
    this.setImageUrl();
    this.setPermissions();
  }
  get file() {
    return this._file;
  }
  @Input()
  fileSystem: FileSystemProvider;
  @Output()
  clickedDownload = new EventEmitter<CoreTypes.ResFile>();
  @Output()
  clickedDelete = new EventEmitter<CoreTypes.ResFile>();
  @Output()
  clickedRename = new EventEmitter<CoreTypes.ResFile>();
  @Output()
  clickedSetPermissions = new EventEmitter<CoreTypes.ResFile>();

  others: string;
  writers: CoreTypes.FilePermissionEntity[];
  readers: CoreTypes.FilePermissionEntity[];

  constructor(
    private logger: LoggerService,
  ) {}

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

  async setImageUrl() {
    this.imageUrl = null;
    try {
      await promiseDelay(300);
      if (!this.hasInput || !this.isFile) {
        return;
      }
      this.imageUrl = await this.fileSystem.CreateDownloadLink(this.file);
    } catch (error) {
      this.logger.error('Error setting ImageUrl', { error }, error);
    }
  }

  setPermissions() {
    if (!this._file || !this._file.permissions) {
      return;
    }
    try {
      const permissions = this._file.permissions;
      this.readers = permissions.readers;
      this.writers = permissions.writers;
      this.others = permissions.others;
    } catch (error) {
      this.logger.error('file-details: setPermissions', {
        error,
        file: this._file
      });
    }
  }
}
