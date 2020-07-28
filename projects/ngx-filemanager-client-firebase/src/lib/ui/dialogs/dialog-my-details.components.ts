import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <base-dialog
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>My Details</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <div>
          The following details were
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <btns-cancel-ok
          okIcon="done"
          okLabel="Create Folder"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogMyDetailsComponent {

  constructor(public dialogRef: MatDialogRef<AppDialogMyDetailsComponent>) {}

  onSubmit() {
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }
}
