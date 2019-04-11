import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { AutoTableConfig } from 'ngx-auto-table';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';

import * as path from 'path-browserify';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from '../dialogs/dialog-new-folder.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table-mini-folder-browser',
  template: `
    <actions-mini-browser
      (clickedUpFolder)="onUpFolder()"
      (clickedNewFolder)="onNewFolder()"
    >
    </actions-mini-browser>
    <ngx-auto-table
      [config]="config"
      [columnDefinitions]="{
        icon: { template: iconTemplate },
        name: { template: nameTemplate, forceWrap: true },
        date: { template: dateTemplate }
      }"
    >
      <ng-template #iconTemplate let-row>
        <img
          class="icon"
          [class.greyed]="row.type === 'file'"
          [src]="row.icon"
          matTooltip="Click For Details"
        />
      </ng-template>
      <ng-template #nameTemplate let-row>
        <div class="break-word" matTooltip="Click For Details">
          {{ row.name }}
        </div>
      </ng-template>
      <ng-template #sizeTemplate let-row>
        <div matTooltip="Click For Details">
          {{ row.size | fileSize }}
        </div>
      </ng-template>
      <ng-template #dateTemplate let-row>
        <div matTooltip="Click For Details">
          {{ row.date | date: 'short' }}
        </div>
      </ng-template>
    </ngx-auto-table>
  `,
  styles: [
    `
      .icon {
        height: 35px;
      }
      .break-word {
        overflow-wrap: break-word;
        word-break: break-all;
      }
      .greyed {
        filter: grayscale(1);
      }
    `
  ],
  providers: [ClientFileSystemService, OptimisticFilesystemService]
})
export class AppFileTableMiniFolderBrowserComponent implements OnInit {
  @Input()
  serverFilesystem: FileSystemProvider;
  @Input()
  currentDirectory: string;

  @Output()
  clickedItem = new EventEmitter<ResFile>();
  @Output()
  clickedOk = new EventEmitter<ResFile>();

  config: AutoTableConfig<ResFile>;

  constructor(
    private clientFilesystem: ClientFileSystemService,
    private optimisticFs: OptimisticFilesystemService,
    private dialog: MatDialog,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.optimisticFs.initialize(this.serverFilesystem, this.clientFilesystem);
    this.config = {
      data$: this.optimisticFs.$FilesWithIcons,
      onSelectItemDoubleClick: async (item: ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          await this.optimisticFs.HandleList(item.fullPath);
          this.optimisticFs.selectFirstInCurrentDirectory();
        }
      }
    };
    this.config.hideFilter = true;
    this.config.hideChooseColumns = true;
    this.optimisticFs.HandleList(this.currentDirectory);
  }

  async onUpFolder() {
    await this.optimisticFs.HandleNavigateUp();
  }
  async onNewFolder() {
    this.logger.info('onClickNewFolder');
    const newDirName = await this.openDialog(AppDialogNewFolderComponent);
    if (!newDirName) {
      this.logger.info('onClickNewFolder   no folder created...');
      return;
    }
    const currentDirectory = await this.getCurrentPath();
    const newDirectoryPath = path.join(currentDirectory, newDirName);
    await this.optimisticFs.HandleCreateFolder(newDirectoryPath);
  }

  private async getCurrentPath() {
    const currentPath = await this.optimisticFs.$CurrentPath
      .pipe(take(1))
      .toPromise();
    return currentPath;
  }

  private async openDialog(comp: any, data?: any) {
    const ref = this.dialog.open(comp, {
      width: '400px',
      hasBackdrop: true,
      disableClose: false,
      data: data
    });
    const result = await ref
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    return result;
  }
}
