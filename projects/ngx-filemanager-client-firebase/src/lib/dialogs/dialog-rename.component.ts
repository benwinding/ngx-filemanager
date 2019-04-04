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
    <div>
      <h2>Rename Item</h2>
      <h5>Old Path: {{ data.currentFilename }}</h5>
      <input
        matInput
        [(ngModel)]="renamedItem"
        [ngModelOptions]="{ standalone: true }"
        (keyup.enter)="onSubmit()"
      />
      <btns-cancel-ok
        okIcon="done"
        okLabel="Rename Folder"
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
  onCancel() {
    this.dialogRef.close();
  }
}
