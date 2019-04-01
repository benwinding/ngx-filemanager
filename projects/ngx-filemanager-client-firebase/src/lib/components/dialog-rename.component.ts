import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface RenameInterface {
  currentPath: string;
  currentFilename: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-rename-file-dialog',
  template: `
    <form (submit)="onSubmit()">
      <h2>Rename Item</h2>
      <h5>Old Name: {{ data.currentFilename }}</h5>
      <input
        matInput
        [(ngModel)]="renamedItem"
        [ngModelOptions]="{ standalone: true }"
      />
      <div class="flexRow">
        <button mat-raised-button color="primary" type="submit">
          <mat-icon>done</mat-icon>
          Create Folder
        </button>
        <button mat-raised-button (click)="onCancel($event)">
          <mat-icon>clear</mat-icon>
          Cancel
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
export class AppDialogRenameComponent {
  renamedItem = '';

  constructor(
    public dialogRef: MatDialogRef<AppDialogRenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameInterface
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
