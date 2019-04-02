import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/public_api';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from './dialog-new-folder.component';
import { RenameDialogInterface } from './dialog-rename.component';
import { AppDialogRenameComponent } from './dialog-rename.component';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core';
import { FilesClientCacheService } from '../services/files-client-cache.service';
import { FileManagerConfig } from './client-configuration';
import { AppDialogSetPermissionsComponent } from './dialog-setpermissions.component';
import { PermissionsDialogInterface } from './dialog-setpermissions.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  template: `
    <div class="page-container">
      <mat-drawer-container>
        <mat-drawer-content>
          <div class="flex-h space-between">
            <strong class="heading">Files</strong>
            <div
              class="mat-elevation-z8 expander-container has-pointer mat-table"
              (click)="isFileDetailsOpen = !isFileDetailsOpen"
            >
              <mat-icon
                matTooltip="View File Details"
                class="expander-icon"
                [class.drawer-out]="isFileDetailsOpen"
                [class.drawer-in]="!isFileDetailsOpen"
                >expand_more</mat-icon
              >
            </div>
          </div>
          <ngx-auto-table
            [config]="autoTableConfig"
            [columnDefinitions]="{
              icon: { template: iconTemplate },
              name: { template: nameTemplate, forceWrap: true },
              size: { template: sizeTemplate },
              date: { template: dateTemplate }
            }"
          >
            <ng-template #iconTemplate let-row>
              <img
                class="icon"
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
        </mat-drawer-content>
        <mat-drawer
          #drawer
          [(opened)]="isFileDetailsOpen"
          class="history-drawer"
          mode="side"
          position="end"
          opened
        >
          <ngx-filemanager-file-details [file]="$SelectedFile | async">
          </ngx-filemanager-file-details>
        </mat-drawer>
      </mat-drawer-container>
    </div>
  `,
  styles: [
    `
      .heading {
        font-family: sans-serif;
        margin-left: 10px;
      }
      mat-drawer {
        width: 300px;
      }
      mat-drawer-container {
        width: 100%;
      }
      .page-container {
        height: calc(100% - 65px);
        display: flex;
      }
      .icon {
        height: 35px;
      }
      .expander-container {
        flex-direction: row-reverse;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        z-index: 1;
        cursor: pointer;
      }
      .expander-icon {
        transition: transform 500ms;
        font-size: 2.5em;
        width: 1em;
        height: 1em;
      }

      .drawer-out {
        transform: rotate(-90deg);
      }
      .drawer-in {
        transform: rotate(90deg);
      }
      .break-word {
        overflow-wrap: break-word;
      }
      .flex-h {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .space-between {
        justify-content: space-between;
      }
    `
  ]
})
export class NgxFileManagerComponent implements OnInit {
  @Input()
  fileSystem: FileSystemProvider;
  @Input()
  config: FileManagerConfig;

  public autoTableConfig: AutoTableConfig<ResFile>;
  public isFileDetailsOpen = true;

  constructor(
    private dialog: MatDialog,
    private clientsCache: FilesClientCacheService
  ) {}

  ngOnInit() {
    if (!this.fileSystem) {
      throw new Error(
        '<ngx-filemanager> must have input selector [fileSystem] set'
      );
    }
    this.clientsCache.initialize(this.fileSystem);
    this.makeConfig();
    if (this.config && this.config.initialPath) {
      this.clientsCache.HandleLoadPath(this.config.initialPath);
    }
  }

  makeConfig() {
    const filesWithIcons$ = this.clientsCache.$FilesWithIcons;
    this.autoTableConfig = {
      data$: filesWithIcons$,
      debug: true,
      actions: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: ResFile) => this.onClickBulkDelete([file])
        },
        {
          label: 'Rename',
          icon: 'border_color',
          onClick: async (file: ResFile) => this.onClickSingleRename(file)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (file: ResFile) => this.onClickSingleSetPermissions(file)
        }
      ],
      actionsBulk: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (files: ResFile[]) => this.onClickBulkDelete(files)
        }
      ],
      onSelectItemDoubleClick: async (item: ResFile) => {
        console.log('files-page: onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.clientsCache.HandleLoadPath(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        console.log('files-page: onSelectItem!', { item });
        this.clientsCache.onSelectItem(item);
      },
      $triggerSelectItem: this.clientsCache.$selectedFile,
      filterText: 'Search files...',
    };
  }

  public get $SelectedFile() {
    return this.clientsCache.$selectedFile;
  }

  private async onClickSingleRename(file: ResFile) {
    const ref = this.dialog.open(AppDialogRenameComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: {
        currentFilename: file.name,
        currentPath: file.fullPath
      } as RenameDialogInterface
    });
    const renamedPath = await ref.afterClosed().toPromise();
    if (!renamedPath) {
      return;
    }
    this.clientsCache.HandleRename(file, renamedPath);
  }

  private onClickSingleSetPermissions(file: ResFile): any {
    const files = [file];
    const ref = this.dialog.open(AppDialogSetPermissionsComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: {
        files: files
      } as PermissionsDialogInterface
    });
    ref.afterClosed().subscribe(async newPermissions => {
      if (!newPermissions) {
        return;
      }
      const paths = files.map(f => f.fullPath);
      await this.clientsCache.HandleSetPermissions(paths, newPermissions, null);
    });
  }

  private async onClickBulkDelete(fArray: ResFile[]) {
    const deletedPaths = fArray.map(f => f.fullPath);
    await this.clientsCache.HandleDelete(deletedPaths);
    this.refreshExplorer();
  }

  public async onClickNewFolder() {
    console.log('files-page: onClickNewFolder');
    const ref = this.dialog.open(AppDialogNewFolderComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false
    });
    const newDirName = await ref
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    if (!newDirName) {
      console.log('files-page: onClickNewFolder   no folder created...');
      return;
    }
    this.clientsCache.HandleNewFolder(newDirName);
    this.refreshExplorer();
  }

  async onClickUpFolder() {
    console.log('files-page: onClickUpFolder');
    this.clientsCache.HandleNavigateUp();
    this.refreshExplorer();
  }

  async onClickUpload() {
    console.log('files-page: onClickUpload');
  }

  private async refreshExplorer() {
    const currentPath = await this.clientsCache.$currentPath
      .pipe(take(1))
      .toPromise();
    this.clientsCache.HandleLoadPath(currentPath);
  }
}
