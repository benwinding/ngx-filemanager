import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResFile } from 'ngx-filemanager-core/public_api';

export interface PermissionsDialogInterface {
  files: ResFile[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-setpermissions-dialog',
  template: `
    <form>
      <h2>Set Permissions</h2>
      <div>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{file.name}}
          </li >
        </ol>
      </div>
      <input
        matInput
        [(ngModel)]="newPermissions"
        [ngModelOptions]="{ standalone: true }"
        (keyup.enter)="onSubmit($event)"
      />
      <btns-cancel-ok
        okIcon="done"
        okText="Set Permissions"
        (clickedCancel)="onCancel($event)"
        (clickedOk)="onSubmit($event)"
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
export class AppDialogSetPermissionsComponent {
  newPermissions = '';
  items: ResFile[];

  constructor(
    public dialogRef: MatDialogRef<AppDialogSetPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogInterface
  ) {
    this.items = data.files;
  }

  onSubmit(e) {
    e.preventDefault();
    this.dialogRef.close(this.newPermissions);
  }
  onCancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
