import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { LoggerService } from '../logging/logger.service';
import { NotificationService } from '../notifications/notification.service';

export interface UploadDialogInterface {
  currentPath: string;
  uploadApiUrl: string;
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
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogUploadFilesComponent {
  currentDirectory = '';

  dropzoneConfig: DropzoneConfigInterface = {
    url:
      'https://httpbin.org/post/upload?bucketname=resvu-integration-tests.appspot.com&directoryPath=/',
    maxFilesize: 50,
    // acceptedFiles: 'image/*',
    uploadMultiple: false
  };

  uploadQueue: {} = {};
  uploadedFiles: string[] = [];
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
    this.dialogRef.close(this.uploadedFiles);
  }

  onCancel() {
    this.dialogRef.close();
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
    console.error('Error uploading file to server', { $event });
    this.notifications.notify(
      'Error uploading file: ' + message,
      'Upload Error'
    );
    this.removeFromQueue(uuid);
  }

  addToQueue(uuid: string) {
    this.uploadQueue[uuid] = true;
  }

  removeFromQueue(uuid: string) {
    delete this.uploadQueue[uuid];
  }
}
