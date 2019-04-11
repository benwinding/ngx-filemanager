import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { FormControl } from '@angular/forms';
import { AutoTableConfig } from 'ngx-auto-table';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { LoggerService } from '../logging/logger.service';

export interface CopyDialogInterface {
  files: ResFile[];
  serverFilesystem: FileSystemProvider;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-copy-dialog',
  template: `
    <base-dialog
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>Copy Items</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{ file.name }}
          </li>
        </ol>
        <div>
          <app-file-table-mini-folder-browser
            (clickedOk)="onClickOk($event)"
            [serverFilesystem]="this.serverFilesystem"
            currentDirectory="/"
          >
          </app-file-table-mini-folder-browser>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="content_copy"
          okLabel="Copy"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogCopyComponent {
  folderName = new FormControl('New folder');
  items: ResFile[];
  serverFilesystem: FileSystemProvider;

  constructor(
    private logger: LoggerService,
    public dialogRef: MatDialogRef<AppDialogCopyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CopyDialogInterface
  ) {
    this.logger.info('initializing dialog:', {data: this.data});
    this.items = data.files;
    this.serverFilesystem = data.serverFilesystem;
  }

  onClickOk(file: ResFile) {
    this.logger.info('clicked this folder:', {file});
  }

  onSubmit() {
    this.dialogRef.close(this.folderName.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
