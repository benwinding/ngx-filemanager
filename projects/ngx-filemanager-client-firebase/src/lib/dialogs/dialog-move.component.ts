import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResFile } from 'ngx-filemanager-core/public_api';
import { FormControl } from '@angular/forms';

export interface MoveDialogInterface {
  files: ResFile[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-move-dialog',
  template: `
    <div class="sans-serif flex-col align-center">
      <div>
        <h2>Move Items</h2>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{ file.name }}
          </li>
        </ol>
      </div>
      <mat-form-field>
        <input matInput [formControl]="folderName" (keyup.enter)="onSubmit()" />
      </mat-form-field>
      <btns-cancel-ok
        okIcon="content_copy"
        okLabel="Copy"
        (clickedCancel)="onCancel()"
        (clickedOk)="onSubmit()"
      >
      </btns-cancel-ok>
    </div>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogMoveComponent {
  folderName = new FormControl('');
  items: ResFile[];

  constructor(
    public dialogRef: MatDialogRef<AppDialogMoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MoveDialogInterface
  ) {
    this.items = data.files;
  }

  onSubmit() {
    this.dialogRef.close(this.folderName.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
