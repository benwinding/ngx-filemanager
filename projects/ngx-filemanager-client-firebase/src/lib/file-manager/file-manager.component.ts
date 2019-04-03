import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/public_api';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from '../dialogs/dialog-new-folder.component';
import { RenameDialogInterface } from '../dialogs/dialog-rename.component';
import { AppDialogRenameComponent } from '../dialogs/dialog-rename.component';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core';
import { FilesClientCacheService } from '../services/files-client-cache.service';
import { FileManagerConfig } from '../services/client-configuration';
import { AppDialogSetPermissionsComponent } from '../dialogs/dialog-setpermissions.component';
import { PermissionsDialogInterface } from '../dialogs/dialog-setpermissions.component';
import {
  AppDialogCopyComponent,
  CopyDialogInterface
} from '../dialogs/dialog-copy.component';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  templateUrl: 'file-manager.component.html',
  styleUrls: ['file-manager.component.scss']
})
export class NgxFileManagerComponent implements OnInit {
  @Input()
  fileSystem: FileSystemProvider;
  @Input()
  config: FileManagerConfig;

  public autoTableConfig: AutoTableConfig<ResFile>;
  public isFileDetailsOpen = true;

  public $BulkSelected = new BehaviorSubject<ResFile[]>([]);
  private $triggerClearSelected = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private clientsCache: FilesClientCacheService
  ) {}

  get $CurrentPath() {
    return this.clientsCache.$currentPath;
  }

  ngOnInit() {
    if (!this.fileSystem) {
      throw new Error(
        '<ngx-filemanager> must have input selector [fileSystem] set'
      );
    }
    this.clientsCache.initialize(this.fileSystem);
    this.makeConfig();
    if (this.config && this.config.initialPath) {
      this.clientsCache.HandleList(this.config.initialPath);
    }
  }

  makeConfig() {
    const filesWithIcons$ = this.clientsCache.$FilesWithIcons;
    this.autoTableConfig = {
      data$: filesWithIcons$,
      // debug: true,
      actions: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (files: ResFile) => this.onCopyMultiple([files])
        },
        {
          label: 'Rename',
          icon: 'border_color',
          onClick: async (file: ResFile) => this.onRename(file)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (file: ResFile) => this.onSetPermissions(file)
        },
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: ResFile) => this.onDelete([file])
        }
      ],
      onSelectedBulk: (files: ResFile[]) => {
        console.log('file-manager: onSelectedBulk', {
          files,
          length: files.length
        });
        this.$BulkSelected.next(files);
      },
      actionsBulk: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (files: ResFile[]) => this.onCopyMultiple(files)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (files: ResFile[]) =>
            this.onSetPermissionsMultiple(files)
        },
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (files: ResFile[]) => this.onDelete(files)
        }
      ],
      onSelectItemDoubleClick: async (item: ResFile) => {
        console.log('file-manager: onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.clientsCache.HandleList(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        console.log('file-manager: onSelectItem!', { item });
        this.clientsCache.onSelectItem(item);
      },
      $triggerSelectItem: this.clientsCache.$selectedFile,
      $triggerClearSelected: this.$triggerClearSelected,
      filterText: 'Search here...',
      hideChooseColumns: true,
      hideFilter: true
    };
  }

  public get $SelectedFile() {
    return this.clientsCache.$selectedFile;
  }

  private async onRename(file: ResFile) {
    const renamedPath = await this.openDialog(AppDialogRenameComponent, {
      currentFilename: file.name,
      currentPath: file.fullPath
    } as RenameDialogInterface);
    if (!renamedPath) {
      return;
    }
    this.clientsCache.HandleRename(file.fullPath, renamedPath);
  }

  private async onSetPermissions(file: ResFile) {
    const newPermissions = await this.openDialog(
      AppDialogSetPermissionsComponent,
      {
        files: [file]
      } as PermissionsDialogInterface
    );
    if (!newPermissions) {
      return;
    }
    await this.clientsCache.HandleSetPermissions(
      file.fullPath,
      newPermissions,
      null
    );
  }

  private async onSetPermissionsMultiple(files: ResFile[]) {
    const newPermissions = await this.openDialog(
      AppDialogSetPermissionsComponent,
      {
        files: files
      } as PermissionsDialogInterface
    );
    if (!newPermissions) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.clientsCache.HandleSetPermissionsMultiple(
      filePaths,
      newPermissions,
      null
    );
  }

  private async onCopyMultiple(files: ResFile[]) {
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, {
      files: files
    } as CopyDialogInterface);
    if (!newFolderPath) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.clientsCache.HandleCopyMultiple(filePaths, newFolderPath);
  }

  public async onClickDownload(file: ResFile) {
    console.log('file-manager: downloading file', { row: file });
  }

  private async onDelete(files: ResFile[]) {
    console.log('file-manager: deleting files', { files });
    const deletedPaths = files.map(f => f.fullPath);
    await this.clientsCache.HandleRemove(deletedPaths);
    this.refreshExplorer();
  }

  public async onClickDelete(file: ResFile) {
    await this.onDelete([file]);
  }

  public async onClickNewFolder() {
    console.log('file-manager: onClickNewFolder');
    const newDirName = await this.openDialog(AppDialogNewFolderComponent);
    if (!newDirName) {
      console.log('file-manager: onClickNewFolder   no folder created...');
      return;
    }
    await this.clientsCache.HandleCreateFolder(newDirName);
    this.refreshExplorer();
  }

  public async onClickUpFolder() {
    console.log('file-manager: onClickUpFolder');
    await this.clientsCache.HandleNavigateUp();
    this.refreshExplorer();
  }

  public async onClickUpload() {
    console.log('file-manager: onClickUpload');
  }

  public async onClickCancelBulk() {
    console.log('file-manager: onClickCancelBulk');
    this.$triggerClearSelected.next();
    this.$BulkSelected.next([]);
  }

  public onClickCrumb(newPath: string) {
    this.clientsCache.HandleList(newPath);
  }

  private async refreshExplorer() {
    const currentPath = await this.clientsCache.$currentPath
      .pipe(take(1))
      .toPromise();
    await this.clientsCache.HandleList(currentPath);
  }

  private async openDialog(comp: any, data?: any) {
    const ref = this.dialog.open(comp, {
      width: '300px',
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
