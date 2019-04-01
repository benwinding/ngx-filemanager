import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/dist/public_api';
import { take, map, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from './dialog-new-folder.component';
import {
  AppDialogRenameComponent,
  RenameInterface
} from './dialog-rename.component';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { FilesClientCacheService } from '../services/files-client-cache.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  template: `
    <div class="page-container">
      <mat-drawer-container>
        <mat-drawer-content>
          <div
            class="mat-elevation-z8 expander-container has-pointer"
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
          <ngx-auto-table
            [config]="config"
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
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
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
    `
  ]
})
export class NgxFileManagerComponent implements OnInit {
  @Input()
  fileSystem: FileSystemProvider;

  public config: AutoTableConfig<ResFile>;
  public isFileDetailsOpen = true;

  constructor(
    private dialog: MatDialog,
    private clientsCache: FilesClientCacheService
  ) {}

  ngOnInit() {
    if (!this.fileSystem) {
      throw new Error(
        '<ngx-filemanager> must have input selector [clientConfig] set'
      );
    }
    this.clientsCache.initialize(this.fileSystem);
    this.makeConfig();
  }

  makeConfig() {
    const filesWithIcons$ = this.clientsCache.$FilesWithIcons;
    this.config = {
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
          onClick: async (file: ResFile) => this.onClickSingleRename(file)
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
      filterText: 'Search files...'
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
      } as RenameInterface
    });
    ref.afterClosed().subscribe(renamedPath => {
      this.clientsCache.HandleRename(file, renamedPath);
    });
  }

  private async onClickBulkDelete(fArray: ResFile[]) {
    const deletedPaths = fArray.map(f => f.fullPath);
    this.clientsCache.HandleDelete(deletedPaths);
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
