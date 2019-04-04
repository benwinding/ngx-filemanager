import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-new-folder-dialog',
  template: `
    <div>
      <h2>Create Folder</h2>
      <input
        matInput
        [(ngModel)]="folderName"
        [ngModelOptions]="{ standalone: true }"
        (keyup.enter)="onSubmit()"
      />
      <btns-cancel-ok
        okIcon="done"
        okLabel="Create Folder"
        (clickedCancel)="onCancel()"
        (clickedOk)="onSubmit()"
      >
      </btns-cancel-ok>
    </div>
  `,
  styles: [
    `
      .flexRow {
        display: flex;
        flex-direction: row;
      }
    `
  ]
})
export class AppDialogNewFolderComponent {
  folderName = 'New folder';

  constructor(public dialogRef: MatDialogRef<AppDialogNewFolderComponent>) {}

  onSubmit() {
    this.dialogRef.close(this.folderName);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
