import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-new-folder-dialog',
  template: `
    <base-dialog
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2 class="sans-serif">Create Folder</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <div class="flex-col align-center">
          <div>
            <mat-form-field>
              <input
                matInput
                placeholder="New Folder Name"
                [formControl]="folderName"
                (keyup.enter)="onSubmit()"
              />
            </mat-form-field>
          </div>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="done"
          okLabel="Create Folder"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogNewFolderComponent {
  folderName = new FormControl('New folder');

  constructor(public dialogRef: MatDialogRef<AppDialogNewFolderComponent>) {}

  onSubmit() {
    this.dialogRef.close(this.folderName.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
