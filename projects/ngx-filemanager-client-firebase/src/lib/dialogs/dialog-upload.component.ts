import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

export interface UploadDialogInterface {
  currentPath: string;
  uploadApiUrl: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-upload-files-dialog',
  template: `
    <div class="dialog">
      <h2>Upload Files</h2>
      <h5>To Folder: {{ currentDirectory }}</h5>
      <div>
        <dropzone
          *ngIf="dropzoneConfig"
          [config]="dropzoneConfig"
          (success)="onUploadSuccess($event)"
          (processing)="onProcessingBegin($event)"
        ></dropzone>
      </div>
    </div>
    <btns-cancel-ok
      okIcon="done"
      okLabel="Finish"
      (clickedCancel)="onCancel()"
      (clickedOk)="onSubmit()"
      [okDisabled]="!isDoneUploading"
    >
    </btns-cancel-ok>
  `,
  styles: [
    `
      form {
        max-height: 50vh;
        overflow-y: scroll;
      }
      .dialog {
        max-height: 80vh;
        overflow: hidden;
      }
    `
  ]
})
export class AppDialogUploadFilesComponent {
  currentDirectory = '';

  dropzoneConfig: DropzoneConfigInterface = {
    url:
      'http://localhost:4444/api_files/upload?bucketname=resvu-integration-tests.appspot.com&directoryPath=/',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    uploadMultiple: false
  };

  uploadQueue: {} = {};
  get isDoneUploading() {
    return Object.keys(this.uploadQueue).length < 1;
  }

  constructor(
    public dialogRef: MatDialogRef<AppDialogUploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogInterface
  ) {
    this.currentDirectory = data.currentPath;
    this.dropzoneConfig.url = data.uploadApiUrl;
  }

  onSubmit() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onProcessingBegin($event) {
    const uuid = $event.upload.uuid;
    console.log('onProcessingBegin', { $event, uuid });
    this.addToQueue(uuid);
  }

  onUploadSuccess($event) {
    const uuid = $event.shift().upload.uuid;
    console.log('onUploadSuccess', { $event, uuid });
    this.removeFromQueue(uuid);
  }

  addToQueue(uuid: string) {
    this.uploadQueue[uuid] = true;
  }

  removeFromQueue(uuid: string) {
    delete this.uploadQueue[uuid];
  }
}
