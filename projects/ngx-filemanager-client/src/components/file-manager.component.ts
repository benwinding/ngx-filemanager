import { OnInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { AutoTableConfig } from 'ngx-auto-table/dist';
import { take, map, tap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from './dialog-new-folder.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AppDialogRenameComponent,
  RenameInterface
} from './dialog-rename.component';
import { FilesSystemProviderService } from '../services/files-provider.service';
import { ResFile } from 'ngx-filemanager-core/public_api';
import { getFileIcon, getFolderIcon } from '../getIcons/file-icon-guesser';
import { MakeClientDirectory } from '../getIcons/file.factory';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-file-manager',
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
          <h2>File Explorer</h2>
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

          <pre>
          {{ $currentFiles | async | json }}
          </pre
          >
        </mat-drawer-content>
        <mat-drawer
          #drawer
          [(opened)]="isFileDetailsOpen"
          class="history-drawer"
          mode="side"
          position="end"
          opened
        >
          <app-file-details [file]="$selectedFile | async"> </app-file-details>
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
export class NgxFileManagerComponent implements OnInit, OnDestroy {
  $currentFiles = new BehaviorSubject<ResFile[]>([]);
  $currentPath = new BehaviorSubject<string>(null);

  $selectedFile = new BehaviorSubject<ResFile>(null);
  $triggerSelectItem = new Subject<ResFile>();

  config: AutoTableConfig<ResFile>;

  isFileDetailsOpen = true;
  querySubscription: Subscription;

  constructor(
    private fp: FilesSystemProviderService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.querySubscription = this.route.queryParams.subscribe(params => {
      const path = params.path;
      console.log('files-page: route.queryParams.subscribe', { path });
      if (!path) {
        this.goToPath('Home');
        return;
      }
      this.setExplorerPath(path);
    });
  }

  ngOnInit() {
    this.makeConfig();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  goToPath(path: string) {
    const url = this.router.url;
    const urlNoQuery = url.split('?').shift();
    console.log('files-page: goToPath', { path, url, urlNoQuery });
    this.router.navigateByUrl(urlNoQuery + '?path=' + path);
  }

  makeConfig() {
    const filesWithIcons$ = this.$currentFiles.pipe(
      map(files => files.map(file => this.addIconPath(file))),
      map(files =>
        files.map(file => {
          return { ...file, id: file.fullPath };
        })
      ),
      tap(files => {
        console.log('files-page: added files to filesWithIcons$', { files });
      })
    );
    this.config = {
      data$: filesWithIcons$,
      debug: true,
      actions: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: ResFile) => this.HandleDelete([file])
        },
        {
          label: 'Rename',
          icon: 'border_color',
          onClick: async (file: ResFile) => this.HandleRename(file)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (file: ResFile) => this.HandleRename(file)
        }
      ],
      actionsBulk: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (files: ResFile[]) => this.HandleDelete(files)
        }
      ],
      onSelectItemDoubleClick: async (item: ResFile) => {
        console.log('files-page: onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.goToPath(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        console.log('files-page: onSelectItem!', { item });
        this.$selectedFile.next(item);
      },
      filterText: 'Search files...',
      $triggerSelectItem: this.$triggerSelectItem.pipe(
        tap(file => console.log('files-page: $triggerSelectItem', { file }))
      )
    };
  }

  private async HandleRename(file: ResFile) {
    const ref = this.dialog.open(AppDialogRenameComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: {
        currentFilename: file.name,
        currentPath: file.fullPath
      } as RenameInterface
    });
    const renamedPath = await ref
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    const currentFiles = await this.currentFiles();
    const renamedFile = currentFiles.find(cf => cf.fullPath === file.fullPath);
    renamedFile.fullPath = renamedPath;
    renamedFile.name = renamedPath.split('/').pop();
    console.log('files-page: renameAction', { file, renamedFile });
    this.$currentFiles.next(currentFiles);
    await this.fp.Rename(file.fullPath, renamedPath);
    this.refreshExplorer();
  }

  private async HandleDelete(fArray: ResFile[]) {
    const deletedPaths = fArray.map(f => f.fullPath);
    const currentFiles = await this.currentFiles();
    const deletedSet = new Set(deletedPaths);
    this.$currentFiles.next(
      currentFiles.filter(cf => !deletedSet.has(cf.fullPath))
    );
    await this.fp.Remove(deletedPaths);
    this.refreshExplorer();
  }

  addIconPath(file: ResFile) {
    if (file.type === 'file') {
      file['icon'] = getFileIcon(file.name);
    } else {
      file['icon'] = getFolderIcon(file.name);
    }
    return file;
  }

  private async setExplorerPath(path: string) {
    const response = await this.fp.List(path);
    const newFiles = [...response.result];
    console.log('files-page: setExplorerPath', { newFiles });
    this.$currentPath.next(path);
    this.$currentFiles.next(newFiles);
    const firstFile = [...newFiles].shift();
    this.$selectedFile.next(firstFile);
    this.$triggerSelectItem.next(firstFile);
  }

  private async refreshExplorer() {
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    this.setExplorerPath(currentPath);
  }

  private async currentFiles() {
    const currentFiles = await this.$currentFiles.pipe(take(1)).toPromise();
    return currentFiles;
  }

  async onClickNewFolder() {
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
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const newDirPath = currentPath + newDirName;
    const currentFiles = await this.currentFiles();
    const tempDir = MakeClientDirectory(newDirName, newDirPath);
    this.addIconPath(tempDir);
    const newFiles = [...currentFiles, tempDir];
    console.log('files-page: onClickNewFolder, making new folder', {
      newDirName,
      currentPath
    });
    this.$currentFiles.next(newFiles);
    await this.fp.CreateFolder(newDirPath);
    this.refreshExplorer();
  }

  get $NoParentFolder() {
    return this.$currentPath.pipe(
      filter(p => !!p),
      map(path => path.split('/').length < 2)
    );
  }

  async onClickUpFolder() {
    console.log('files-page: onClickUpFolder');
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const slashSegments = currentPath.split('/');
    slashSegments.pop();
    const parentPath = slashSegments.join('/');
    console.log('files-page: onClickUpFolder', { currentPath, parentPath });
    this.goToPath(parentPath);
  }

  onClickUpload() {
    console.log('files-page: onClickUpload');
  }
}
