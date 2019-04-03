import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface RenameDialogInterface {
  currentPath: string;
  currentFilename: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-rename-file-dialog',
  template: `
    <form (submit)="onSubmit()">
      <h2>Rename Item</h2>
      <h5>Old Path: {{ data.currentFilename }}</h5>
      <input
        matInput
        [(ngModel)]="renamedItem"
        [ngModelOptions]="{ standalone: true }"
      />
      <btns-cancel-ok
        okIcon="done"
        okText="Rename Folder"
        (clickedCancel)="onCancel($event)"
        (clickedOk)="onSubmit()"
      >
      </btns-cancel-ok>
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
export class AppDialogRenameComponent {
  renamedItem = '';

  constructor(
    public dialogRef: MatDialogRef<AppDialogRenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameDialogInterface
  ) {
    this.renamedItem = data.currentFilename;
  }

  onSubmit() {
    const slashSegments = this.data.currentPath.split('/');
    slashSegments.pop();
    const parent = slashSegments.join('/');
    const renamedFullPath = parent + '/' + this.renamedItem;
    this.dialogRef.close(renamedFullPath);
  }
  onCancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
