import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoreTypes } from '../../../core-types';
import { LoggerService } from '../../state/logging/logger.service';
import path from 'path-browserify';
import { Observable } from 'rxjs';
import { EnsureTrailingSlash } from '../../utils/path-helpers';
import { ActionHandlersService } from '../file-manager/action-handlers.service';

export interface CopyDialogInterface {
  files: CoreTypes.ResFile[];
  isCopy: boolean;
  actionHandler: ActionHandlersService;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-copy-dialog',
  template: `
    <base-dialog
      *ngIf="currentDir"
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>{{OkLabel}} Items</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <h5>Selected Items</h5>
        <ol>
          <li *ngFor="let file of items">
            {{ file.name }}
          </li>
        </ol>
        <div>
          <app-file-table-mini-folder-browser
            [$CurrentPathIsRoot]="$CurrentPathIsRoot"
            (selectedDirectory)="onClickedItem($event)"
            [actionHandlers]="this.actionHandlers"
            [currentDirectory]="currentDir"
          >
          </app-file-table-mini-folder-browser>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <h5 class="p5 m0" *ngIf="!SelectedFolder">No folder selected</h5>
        <h5 class="p5 m0" *ngIf="SameAsRoot">Cannot copy to the same folder</h5>
        <h5 class="p5 m0" *ngIf="!DisableCopy">CopyTo Path: {{copyToPath}}</h5>
        <btns-cancel-ok
          [okIcon]="OkIcon"
          [okLabel]="OkLabel"
          [okDisabled]="DisableCopy"
          (clickedCancel)="onCancel()"
          (clickedOk)="onSubmit()"
        >
        </btns-cancel-ok>
      </ng-template>
    </base-dialog>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogCopyComponent {
  copyToPath: string;
  currentDir: string;
  items: CoreTypes.ResFile[];
  actionHandlers: ActionHandlersService;

  $CurrentPathIsRoot: Observable<boolean>;

  OkLabel: string;
  OkIcon: string;

  constructor(
    private logger: LoggerService,
    public dialogRef: MatDialogRef<AppDialogCopyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CopyDialogInterface
  ) {
    this.init().catch();
  }

  async init() {
    this.logger.info('initializing dialog:', {data: this.data});
    this.items = this.data.files;
    if (this.data.isCopy) {
      this.OkLabel = 'Copy';
      this.OkIcon = 'content_copy';
    } else {
      this.OkLabel = 'Move';
      this.OkIcon = 'forward';
    }
    this.actionHandlers = await this.data.actionHandler.CloneProvider();
    this.$CurrentPathIsRoot = this.actionHandlers.$CurrentPathIsRoot;
    const firstFile = [...this.items].pop();
    this.currentDir = EnsureTrailingSlash(path.dirname(firstFile.fullPath));
  }

  get SelectedFolder() {
    return !!this.copyToPath;
  }
  get SameAsRoot() {
    return this.copyToPath === this.currentDir;
  }
  get DisableCopy() {
    return !this.SelectedFolder || this.SameAsRoot;
  }

  onClickedItem(selectedDirectory: string) {
    this.logger.info('clicked this item:', {file: selectedDirectory});
    this.copyToPath = selectedDirectory;
  }

  onSubmit() {
    this.dialogRef.close(this.copyToPath);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
