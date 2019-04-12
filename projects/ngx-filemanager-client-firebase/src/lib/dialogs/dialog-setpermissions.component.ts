import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResFile } from 'ngx-filemanager-core/public_api';
import { FormControl } from '@angular/forms';

export interface PermissionsDialogInterface {
  files: ResFile[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-setpermissions-dialog',
  template: `
    <base-dialog
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>Set Permissions</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{ file.name }}
          </li>
        </ol>
        <mat-form-field>
          <input
            matInput
            placeholder="Permissions String (rxrxxsr)"
            [formControl]="permissionsCtrl"
            (keyup.enter)="onSubmit()"
          />
        </mat-form-field>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="done"
          okLabel="Set Permissions"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogSetPermissionsComponent {
  permissionsCtrl = new FormControl();
  items: ResFile[];

  constructor(
    public dialogRef: MatDialogRef<AppDialogSetPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogInterface
  ) {
    this.items = data.files;
  }

  onSubmit() {
    this.dialogRef.close(this.permissionsCtrl.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
