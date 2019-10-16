import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from '../logging/logger.service';
import { FormFilesConfiguration } from '../file-upload/form-file-firebase/form-file-firebase.component';
import { NotificationService } from '../notifications/notification.service';
import { FormArrayFileObject } from '../file-upload/form-file-firebase/FormArrayFileObject';

export interface UploadDialogInterface {
  currentDirectory: string;
  firebaseConfig: {};
  bucketName: string;
}

export interface UploadDialogResponseInterface {
  uploaded: string[];
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
        <div style="width: 100%;">
          <form-file-firebase
            [formControl]="filesControl"
            [config]="config"
            (uploadStatusChanged)="isUploading.next($event)"
          >
          </form-file-firebase>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="done"
          okLabel="Finish"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
          [okDisabled]="isUploading | async"
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
  filesControl = new FormControl([]);

  currentDirectory = '';

  config: FormFilesConfiguration;
  isUploading = new BehaviorSubject<boolean>(true);

  constructor(
    private logger: LoggerService,
    private notifications: NotificationService,
    public dialogRef: MatDialogRef<AppDialogUploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogInterface
  ) {
    this.config = {
      directory: data.currentDirectory,
      bucketname: data.bucketName,
      firebaseConfig: data.firebaseConfig
    };
    this.logger.info('initializing:', {
      currentDirectory: this.currentDirectory,
      config: this.config,
      data: data
    });
  }

  onSubmit() {
    const files = this.filesControl.value as FormArrayFileObject[];
    const response: UploadDialogResponseInterface = {
      uploaded: files.map(f => f.value.name)
    };
    this.dialogRef.close(response);
  }

  onCancel() {
    const response: UploadDialogResponseInterface = {
      uploaded: []
    };
    this.dialogRef.close(response);
  }
}
