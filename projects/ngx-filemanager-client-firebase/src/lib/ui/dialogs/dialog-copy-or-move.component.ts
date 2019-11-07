import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoreTypes } from '../../../core-types';
import { LoggerService } from '../../services/logging/logger.service';
import path from 'path-browserify';
import { Subject } from 'rxjs';
import { EnsureTrailingSlash } from '../../utils/path-helpers';
import { ActionHandlersService } from '../main-file-manager/action-handlers.service';
import { takeUntil } from 'rxjs/operators';
import { MainActionDefinition } from '../actions-toolbars/MainActionDefinition';

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
        <h2>{{ OkLabel }} Items</h2>
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
            [folders]="folders"
            [mainActions]="mainActions"
            (enterDirectory)="onEnterDirectory($event)"
            (selectedDirectory)="onSelectedDirectory($event)"
          >
          </app-file-table-mini-folder-browser>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <h5 class="p5 m0" *ngIf="!SelectedFolder">No folder selected</h5>
        <h5 class="p5 m0" *ngIf="SameAsRoot">Cannot copy to the same folder</h5>
        <h5 class="p5 m0" *ngIf="!DisableCopy">
          CopyTo Path: {{ copyToPath }}
        </h5>
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
export class AppDialogCopyComponent implements OnDestroy {
  copyToPath: string;
  currentDir: string;
  items: CoreTypes.ResFile[];
  actionHandlers: ActionHandlersService;

  mainActions: MainActionDefinition[];
  folders: CoreTypes.ResFile[];

  OkLabel: string;
  OkIcon: string;

  destroyed = new Subject();

  constructor(
    private logger: LoggerService,
    public dialogRef: MatDialogRef<AppDialogCopyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CopyDialogInterface
  ) {
    this.init().catch(e => console.error(e));
  }

  async init() {
    this.logger.info('initializing dialog:', { data: this.data });
    this.items = this.data.files;
    if (this.data.isCopy) {
      this.OkLabel = 'Copy';
      this.OkIcon = 'content_copy';
    } else {
      this.OkLabel = 'Move';
      this.OkIcon = 'forward';
    }
    this.actionHandlers = await this.data.actionHandler.CloneProvider();
    this.mainActions = [
      {
        label: 'Back',
        icon: 'reply',
        onClick: async () => {
          this.logger.info('Back clicked');
          await this.actionHandlers.OnNavigateToParent();
          const selectedDirectory = await this.actionHandlers.GetCurrentPath();
          return this.onSelectedDirectory(selectedDirectory);
        },
        $disabled: this.actionHandlers.$CurrentPathIsRoot
      },
      {
        label: 'New Folder',
        icon: 'create_new_folder',
        onClick: async () => this.actionHandlers.OnNewFolderInCurrentDirectory()
      }
    ];
    this.actionHandlers.$FilesWithIcons
      .pipe(takeUntil(this.destroyed))
      .subscribe(fileItems => {
        this.folders = fileItems.filter(f => f.type === 'dir');
      });

    const firstFile = [...this.items].pop();
    this.currentDir = EnsureTrailingSlash(path.dirname(firstFile.fullPath));
  }

  ngOnDestroy() {
    this.destroyed.next();
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

  onEnterDirectory(directoryPath: string) {
    this.logger.info('clicked this item:', { directoryPath });
    this.copyToPath = directoryPath;
    return this.actionHandlers.OnNavigateTo(directoryPath);
  }

  onSelectedDirectory(directoryPath: string) {
    this.logger.info('clicked this item:', { directoryPath });
    this.copyToPath = directoryPath;
  }

  onSubmit() {
    this.dialogRef.close(this.copyToPath);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
