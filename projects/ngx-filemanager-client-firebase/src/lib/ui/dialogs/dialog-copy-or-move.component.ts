import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreTypes } from '../../../core-types';
import { LoggerService } from '../../services/logging/logger.service';
import path from 'path-browserify';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { EnsureTrailingSlash } from '../../utils/path-helpers';
import { ActionHandlersService } from '../main-file-manager/action-handlers.service';
import { takeUntil, map } from 'rxjs/operators';
import { MainActionDefinition } from '../actions-toolbars/MainActionDefinition';

export interface CopyDialogInterface {
  files: CoreTypes.ResFile[];
  isCopy: boolean;
  actionHandler: ActionHandlersService;
}

@Component({
  template: `
    <base-dialog
      *ngIf="srcDirectory"
      [header]="headerTemplate"
      [body]="bodyTemplate"
      [actions]="actionsTemplate"
    >
      <ng-template #headerTemplate>
        <h2>{{ OkLabel }} Items</h2>
      </ng-template>
      <ng-template #bodyTemplate>
        <h5 class="my-5">Selected Items</h5>
        <mat-chip-list class="mb-5">
          <mat-chip *ngFor="let file of items">
            <mat-icon *ngIf="file.type === 'file'">description</mat-icon>
            <mat-icon *ngIf="file.type !== 'file'">folder</mat-icon>
            {{ file.name }}
          </mat-chip>
        </mat-chip-list>
        <h5 class="my-5">Navigate to destination folder</h5>
        <div class="full-width">
          <mat-card class="m-10 bg-grey">
            <app-file-table-mini-folder-browser
              [folders]="folders"
              [mainActions]="mainActions"
              (enterDirectory)="onEnterDirectory($event)"
              (selectedDirectory)="onSelectedDirectory($event)"
            >
            </app-file-table-mini-folder-browser>
          </mat-card>
        </div>
      </ng-template>
      <ng-template #actionsTemplate>
        <h5 class="p5 m0" *ngIf="!SelectedFolder">No folder selected</h5>
        <h5 class="p5 m0" *ngIf="SameAsSrcFolder">
          Cannot copy to the same folder
        </h5>
        <h5 class="p5 m0" *ngIf="!DisableCopy">
          Will copy Selected Items to:
          <strong *ngIf="!copyToPathRelative">/</strong>
          <strong>{{ copyToPathRelative }}</strong>
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
  styles: [
    `
      .bg-grey {
        background-color: #eee;
      }
    `
  ],
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppDialogCopyComponent implements OnDestroy {
  copyToPathRelative: string;
  copyToPath: string;
  srcDirectory: string;
  items: CoreTypes.ResFile[];
  actionHandlers: ActionHandlersService;

  mainActions: MainActionDefinition[];
  folders: CoreTypes.ResFile[];

  OkLabel: string;
  OkIcon: string;

  destroyed = new Subject();
  $copyPathChanged = new BehaviorSubject<string>(null);

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
        label: 'Home',
        icon: 'home',
        onClick: async () => {
          this.logger.info('Back clicked');
          const rootPath = this.actionHandlers.GetRootPath();
          await this.actionHandlers.OnNavigateTo(rootPath);
          this.onSelectedDirectory(rootPath);
          return this.onSelectedDirectory(rootPath);
        },
        $disabled: combineLatest([
          this.actionHandlers.$CurrentPathIsRoot,
          this.$copyPathChanged
        ]).pipe(
          map(([isRoot, copyTo]) => {
            return this.DisableCopy;
          })
        )
      },
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
    this.setSrcDirectory(firstFile.fullPath);
    this.setCopyToPath(this.actionHandlers.GetRootPath());
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  get SelectedFolder() {
    return !!this.copyToPath;
  }
  get SameAsSrcFolder() {
    return this.copyToPath === this.srcDirectory;
  }
  get DisableCopy() {
    return !this.SelectedFolder || this.SameAsSrcFolder;
  }

  private setCopyToPath(inputPath: string) {
    const dirPath = EnsureTrailingSlash(inputPath);
    this.copyToPath = dirPath;
    this.$copyPathChanged.next(dirPath);
    this.copyToPathRelative = this.actionHandlers.ConvertToRelativePath(
      dirPath
    );
    this.logger.info('setCopyToPath:', {
      inputPath,
      copyToPath: this.copyToPath,
      copyToPathRelative: this.copyToPathRelative
    });
  }

  private setSrcDirectory(inputPath: string) {
    const dirPath = EnsureTrailingSlash(path.dirname(inputPath));
    this.srcDirectory = dirPath;
    this.logger.info('setSrcDirectory:', {
      inputPath,
      srcDirectory: this.srcDirectory
    });
  }

  onEnterDirectory(directoryPath: string) {
    this.logger.info('onEnterDirectory:', { directoryPath });
    this.setCopyToPath(directoryPath);
    return this.actionHandlers.OnNavigateTo(directoryPath);
  }

  onSelectedDirectory(directoryPath: string) {
    this.logger.info('onSelectedDirectory:', { directoryPath });
    this.setCopyToPath(directoryPath);
  }

  onSubmit() {
    this.dialogRef.close(this.copyToPath);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
