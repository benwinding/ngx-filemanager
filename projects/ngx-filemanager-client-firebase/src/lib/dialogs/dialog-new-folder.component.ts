import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-new-folder-dialog',
  template: `
    <div class="sans-serif flex-col align-center">
      <div class="is-red">
        <h2>Create Folder</h2>
        <mat-form-field>
          <input
            matInput
            placeholder="New Folder Name"
            [formControl]="folderName"
            (keyup.enter)="onSubmit()"
          />
        </mat-form-field>
      </div>
      <btns-cancel-ok
        okIcon="done"
        okLabel="Create Folder"
        (clickedCancel)="onCancel()"
        (clickedOk)="onSubmit()"
      >
      </btns-cancel-ok>
    </div>
  `,
  styleUrls: [
    '../shared-utility-styles.scss'
  ]
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
