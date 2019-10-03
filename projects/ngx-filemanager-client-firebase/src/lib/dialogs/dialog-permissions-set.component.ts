import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  FileManagerConfig,
  NameUid
} from '../configuration/client-configuration';
import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
import { LoggerService } from '../logging/logger.service';

export interface PermissionsDialogInterface {
  files: CoreTypes.ResFile[];
  config: FileManagerConfig;
}
export interface PermissionsDialogResponseInterface {
  role: CoreTypes.PermissionsRole;
  entity: CoreTypes.FilePermissionEntity;
  files: CoreTypes.ResFile[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-permissions-set-dialog',
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

        <mat-form-field class="full-width">
          <mat-select
            matInput
            [formControl]="entityTypeControl"
            placeholder="Type"
          >
            <mat-option
              *ngFor="let option of entityTypeOptions"
              [value]="option"
            >
              {{ option }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width" *ngIf="HasSelectedUser">
          <mat-select
            matInput
            [formControl]="entityControl"
            [placeholder]="EntityControlLabel"
          >
            <mat-option *ngFor="let entity of $users | async" [value]="entity">
              {{ entity.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width" *ngIf="!HasSelectedUser">
          <mat-select
            matInput
            [formControl]="entityControl"
            [placeholder]="EntityControlLabel"
          >
            <mat-option *ngFor="let entity of $groups | async" [value]="entity">
              {{ entity.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-select
            matInput
            [formControl]="roleControl"
            placeholder="Permissions"
          >
            <mat-option *ngFor="let option of roleOptions" [value]="option">
              {{ option }}
            </mat-option>
          </mat-select>
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
export class AppDialogPermissionsSetComponent implements OnDestroy {
  items: CoreTypes.ResFile[];
  roleControl = new FormControl('READER');
  roleOptions: CoreTypes.PermissionsRole[] = ['OWNER', 'WRITER', 'READER'];

  entityTypeControl = new FormControl('group');
  entityTypeOptions: ('user' | 'group')[] = ['user', 'group'];
  entityControl = new FormControl();

  $users: Observable<NameUid[]>;
  $groups: Observable<NameUid[]>;

  destroyed = new Subject();

  constructor(
    private logger: LoggerService,
    public dialogRef: MatDialogRef<AppDialogPermissionsSetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogInterface
  ) {
    this.items = data.files;
    const config = data.config;
    this.$users = config.users;
    this.$groups = config.groups;
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  get EntityControlLabel() {
    return this.entityTypeControl.value === 'user' ? 'User' : 'Group';
  }

  get HasSelectedUser() {
    return this.entityTypeControl.value === 'user';
  }

  onSubmit() {
    const choosenValue = this.entityControl.value as NameUid;
    const entity = choosenValue.uid;
    const response: PermissionsDialogResponseInterface = {
      role: this.roleControl.value,
      entity: entity,
      files: this.data.files
    };
    this.logger.info('onSubmit', { entity, choosenValue, response });
    this.dialogRef.close(response);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
