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
    <div>
      <h2>Set Permissions</h2>
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
        [(ngModel)]="newPermissions"
        [ngModelOptions]="{ standalone: true }"
        (keyup.enter)="onSubmit()"
      />
      <btns-cancel-ok
        okIcon="done"
        okLabel="Set Permissions"
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
export class AppDialogSetPermissionsComponent {
  newPermissions = '';
  items: ResFile[];

  constructor(
    public dialogRef: MatDialogRef<AppDialogSetPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogInterface
  ) {
    this.items = data.files;
  }

  onSubmit() {
    this.dialogRef.close(this.newPermissions);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
