import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { LoggerService } from '../logging/logger.service';
import { NotificationService } from '../notifications/notification.service';

export interface UploadDialogInterface {
  currentPath: string;
  uploadApiUrl: string;
}

export interface UploadDialogResponseInterface {
  uploaded: string[];
  removed: string[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-upload-files-dialog',
  template: `
    <base-dialog
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>Upload Files</h2>
        <h5>To Folder: {{ currentDirectory }}</h5>
      </ng-template>
      <ng-template #bodyTemplate>
        <dropzone
          *ngIf="dropzoneConfig"
          [config]="dropzoneConfig"
          (removedFile)="onRemove($event)"
          (canceled)="onSingleCancelled($event)"
          (success)="onUploadSuccess($event)"
          (processing)="onProcessingBegin($event)"
          (error)="onError($event)"
        ></dropzone>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="done"
          okLabel="Finish"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
          [okDisabled]="!isDoneUploading"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
    <div #hidden></div>
  `,
  styles: [
    `
      .dz-image {
        display: none;
      }
      .dz-details > img {
        display: none;
      }
    `
  ],
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogUploadFilesComponent {
  currentDirectory = '';

  dropzoneConfig: DropzoneConfigInterface = {
    url:
      'https://httpbin.org/post/upload?bucketname=resvu-integration-tests.appspot.com&directoryPath=/',
    maxFilesize: 50,
    // acceptedFiles: 'image/*',
    // addRemoveLinks: true,
    uploadMultiple: false,
    previewTemplate: `
    <div class="dz-preview dz-file-preview">
      <div data-dz-remove style="
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 40px;
        z-index: 1111;
      ">
        <span style="cursor: pointer;">⮿</span>
      </div>
      <div class="dz-image">
        <img data-dz-thumbnail />
      </div>
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
      </div>
      <div class="dz-progress">
        <span class="dz-upload" data-dz-uploadprogress></span>
      </div>
      <div class="dz-error-message"><span data-dz-errormessage=""></span></div>
      <div class="dz-success-mark">
        <span style="
          font-size: 81px;
          margin-left: -4px;
          margin-top: -11px;
          position: fixed;
          color: #4caf50;
        ">✔</span>
      </div>
      <div class="dz-error-mark">
        <span style="
          font-size: 81px;
          margin-left: -4px;
          margin-top: -11px;
          position: fixed;
          color: #f44336;
        ">✘</span>
      </div>
      <a data-dz-remove style="display: none;">
      </a>
    </div>
    `
  };

  uploadQueue: {} = {};
  uploadedFiles: string[] = [];
  removedFiles: string[] = [];

  get isDoneUploading() {
    return Object.keys(this.uploadQueue).length < 1;
  }

  constructor(
    private logger: LoggerService,
    private notifications: NotificationService,
    public dialogRef: MatDialogRef<AppDialogUploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogInterface
  ) {
    this.currentDirectory = data.currentPath;
    this.dropzoneConfig.url = data.uploadApiUrl;
  }

  onSubmit() {
    const response: UploadDialogResponseInterface = {
      uploaded: this.uploadedFiles,
      removed: this.removedFiles
    };
    this.dialogRef.close(response);
  }

  onCancel() {
    const response: UploadDialogResponseInterface = {
      uploaded: [],
      removed: this.removedFiles.concat(this.uploadedFiles)
    };
    this.dialogRef.close(response);
  }

  onProcessingBegin($event) {
    const uuid = $event.upload.uuid;
    this.logger.info('onProcessingBegin', { $event, uuid });
    this.addToQueue(uuid);
  }

  onUploadSuccess($event) {
    const file = $event.shift();
    const uuid = file.upload.uuid;
    this.logger.info('onUploadSuccess', { $event, uuid });
    this.uploadedFiles.push(file.name);
    this.removeFromQueue(uuid);
  }

  onError($event) {
    const file = $event.shift();
    const uuid = file.upload.uuid;
    const message = $event.shift();
    this.logger.error('Error uploading file to server', { $event });
    this.notifications.notify(
      'Error uploading file: ' + message,
      'Upload Error'
    );
    this.removeFromQueue(uuid);
  }

  onRemove($event) {
    const file = $event;
    if (file.status === 'success') {
      return;
    }
    const uuid = file.upload.uuid;
    this.removeFromQueue(uuid);
    this.uploadedFiles = this.uploadedFiles.filter(
      fname => fname !== file.name
    );
    this.removedFiles.push(file.name);
    this.logger.info('onRemove', { $event });
  }

  onSingleCancelled($event) {
    const file = $event;
    const uuid = file.upload.uuid;
    this.removeFromQueue(uuid);
    this.logger.info('onSingleCancelled', { $event });
  }

  addToQueue(uuid: string) {
    this.uploadQueue[uuid] = true;
  }

  removeFromQueue(uuid: string) {
    delete this.uploadQueue[uuid];
  }
}
