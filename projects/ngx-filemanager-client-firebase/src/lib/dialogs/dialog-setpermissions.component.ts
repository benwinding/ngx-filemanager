import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, Subject, pipe } from 'rxjs';
import {
  FileManagerConfig,
  NameUid
} from '../configuration/client-configuration';
import { takeUntil, map, tap } from 'rxjs/operators';
import { CoreTypes } from 'ngx-filemanager-core/public_api';

export interface PermissionsDialogInterface {
  files: CoreTypes.ResFile[];
  config: FileManagerConfig;
}
export interface PermissionsDialogResponseInterface {
  role: CoreTypes.PermissionsRole;
  entity: CoreTypes.PermissionEntity;
  files: CoreTypes.ResFile[];
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
            <mat-option
              *ngFor="let entity of ($users | async)"
              [value]="entity"
            >
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
            <mat-option
              *ngFor="let entity of ($groups | async)"
              [value]="entity"
            >
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
export class AppDialogSetPermissionsComponent implements OnDestroy {
  items: CoreTypes.ResFile[];
  roleControl = new FormControl('READER');
  roleOptions: CoreTypes.PermissionsRole[] = ['OWNER', 'WRITER', 'READER'];

  entityTypeControl = new FormControl('group');
  entityTypeOptions: ('user' | 'group')[] = ['user', 'group'];
  entityControl = new FormControl();

  $users: Observable<CoreTypes.PermissionEntity[]>;
  $groups: Observable<CoreTypes.PermissionEntity[]>;

  destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<AppDialogSetPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogInterface
  ) {
    this.items = data.files;
    const config = data.config;
    this.$users = config.users.pipe(this.pipeConvertToEntity('user'));
    this.$groups = config.groups.pipe(this.pipeConvertToEntity('group'));
  }

  pipeConvertToEntity(type: 'user' | 'group') {
    return pipe(
      map((arr: NameUid[]) => {
        return arr.map(value => {
          const entity: CoreTypes.PermissionEntity = {
            name: value.name,
            id: value.uid
          };
          return entity;
        });
      }),
      tap(vals => console.log('dialog setpermissions', { type, vals }))
    );
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
    const response: PermissionsDialogResponseInterface = {
      role: this.roleControl.value,
      entity: this.entityControl.value,
      files: this.data.files
    };
    this.dialogRef.close(response);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
