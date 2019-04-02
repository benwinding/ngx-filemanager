import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResFile } from 'ngx-filemanager-core/public_api';

export interface CopyDialogInterface {
  files: ResFile[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-copy-dialog',
  template: `
    <form (submit)="onSubmit()">
      <h2>Copy Items</h2>
      <div>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{ file.name }}
          </li>
        </ol>
      </div>
      <input
        matInput
        [(ngModel)]="folderName"
        [ngModelOptions]="{ standalone: true }"
      />
      <div class="flexRow">
        <button mat-raised-button color="primary" type="submit">
          <mat-icon>content_copy</mat-icon>
          Copy
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
export class AppDialogCopyComponent {
  folderName = 'New folder';
  items: ResFile[];

  constructor(
    public dialogRef: MatDialogRef<AppDialogCopyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CopyDialogInterface
  ) {
    this.items = data.files;
  }

  onSubmit() {
    this.dialogRef.close(this.folderName);
  }
  onCancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
