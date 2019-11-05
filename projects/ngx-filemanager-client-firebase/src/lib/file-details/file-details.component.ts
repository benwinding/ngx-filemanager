import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileSystemProvider, CoreTypes } from '../../core-types';
import { promiseDelay } from '../utils/delayer';
import { LoggerService } from '../logging/logger.service';
import { getFileIconName } from '../file-upload/form-file-firebase/file-icon.helper';
import { FileManagerConfig } from '../configuration/client-configuration';

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
              matTooltip="Click to Delete"
              (click)="this.clickedDelete.emit(file)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </span>
        </span>
        <span class="flex-row space-between align-top mt-5">
          <div>
            <h5>Name</h5>
            <h6 class="filename">{{ file.name }}</h6>
          </div>
          <button
            mat-mini-fab
            color="primary"
            class="has-pointer"
            matTooltip="Click to Rename"
            (click)="this.clickedRename.emit(file)"
          >
            <mat-icon>border_color</mat-icon>
          </button>
        </span>
        <h5 class="mt-5">Size</h5>
        <h6>{{ file.size | fileSize }}</h6>
        <h5 class="mt-5">Date</h5>
        <h6>{{ file.date | date: 'short' }}</h6>
        <span class="flex-row space-between align-top mt-5">
          <div>
            <h5>Permissions</h5>
            <div class="mb-10">
              <div *ngIf="readers?.length">
                <h6>Who can see this</h6>
                <mat-chip-list>
                  <mat-chip *ngFor="let entity of readers">
                    <mat-icon>people</mat-icon>
                    <span>{{ entity }}</span>
                  </mat-chip>
                </mat-chip-list>
              </div>
              <div *ngIf="config?.showWriters && writers?.length">
                <h6>Who can edit this</h6>
                <mat-chip-list>
                  <mat-chip *ngFor="let entity of writers">
                    <mat-icon>people</mat-icon>
                    <span>{{ entity }}</span>
                  </mat-chip>
                </mat-chip-list>
              </div>
              <div *ngIf="config?.showOthers && others">
                <h6>Everyone else can</h6>
                <mat-chip-list>
                  <mat-chip>
                    {{ others }}
                  </mat-chip>
                </mat-chip-list>
              </div>
            </div>
          </div>
          <button
            mat-mini-fab
            color="primary"
            class="has-pointer"
            matTooltip="Click to Set Permissions"
            [disabled]="!isAdmin"
            (click)="this.clickedSetPermissions.emit(file)"
          >
            <mat-icon>lock_outline</mat-icon>
          </button>
        </span>
        <h5 class="mt-5">Full Path</h5>
        <h6>{{ file.fullPath }}</h6>
        <h5 class="mt-5">Type</h5>
        <h6 *ngIf="!isFile">Directory</h6>
        <h6 *ngIf="isFile" class="capitalize ">
          {{ getFileType(file.name) }}
        </h6>
        <div *ngIf="isFile" class="flex-row space-between align-top mt-5">
          <div>
            <h5>Download</h5>
            <div *ngIf="isImage" class="preview">
              <i>Image Preview</i>
              <div
                class="has-pointer"
                (click)="this.clickedDownload.emit(file)"
              >
                <img *ngIf="imageUrl" [src]="imageUrl" />
              </div>
            </div>
            <div *ngIf="!isImage">
              <h6 class="no-preview-text">
                No preview available
              </h6>
            </div>
          </div>
          <button
            mat-mini-fab
            color="primary"
            class="has-pointer"
            matTooltip="Click to Download"
            (click)="this.clickedDownload.emit(file)"
          >
            <mat-icon>file_download</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .filename {
        padding-right: 10px;
      }
      .none-selected {
        color: grey;
        text-align: center;
        width: 100%;
        margin-top: 100px;
      }
      .mb-10 {
        margin-bottom: 10px;
      }
      .-mt-25 {
        margin-top: -25px;
      }
      .mt-5 {
        margin-top: 10px;
      }
      .no-preview-text {
        color: grey;
        font-decoration: italic;
      }
      mat-chip,
      span,
      h2,
      h5,
      i,
      h6 {
        font-family: sans-serif;
      }
      h5 {
        margin: 0px;
        color: #616161;
        font-weight: normal;
      }
      h6 {
        margin: 0px;
        font-size: 1em;
        overflow-wrap: break-word;
        font-weight: normal;
        margin-bottom: 5px;
        margin-top: 2px;
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
    this.logger.info('file-details: set file', { newFile });
    this._file = newFile;
    this.setImageUrl();
    this.setPermissions();
  }
  get file() {
    return this._file;
  }
  @Input()
  isAdmin: boolean;
  @Input()
  fileSystem: FileSystemProvider;
  @Input()
  config: FileManagerConfig;
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

  constructor(private logger: LoggerService) {}

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
