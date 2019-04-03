import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-new-folder-dialog',
  template: `
    <form (submit)="onSubmit()">
      <h2>Create Folder</h2>
      <input
        matInput
        [(ngModel)]="folderName"
        [ngModelOptions]="{ standalone: true }"
      />
      <div class="flexRow">
        <button mat-raised-button (click)="onCancel($event)">
          <mat-icon>clear</mat-icon>
          Cancel
        </button>
        <button mat-raised-button color="primary" type="submit">
          <mat-icon>done</mat-icon>
          Create Folder
        </button>
      </div>
    </form>
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
  onCancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
