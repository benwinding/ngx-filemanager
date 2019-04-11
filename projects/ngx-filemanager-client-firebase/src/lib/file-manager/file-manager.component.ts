import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/public_api';
import { take, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from '../dialogs/dialog-new-folder.component';
import { RenameDialogInterface } from '../dialogs/dialog-rename.component';
import { AppDialogRenameComponent } from '../dialogs/dialog-rename.component';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core';
import { FileManagerConfig } from '../configuration/client-configuration';
import { AppDialogSetPermissionsComponent } from '../dialogs/dialog-setpermissions.component';
import { PermissionsDialogInterface } from '../dialogs/dialog-setpermissions.component';
import {
  AppDialogCopyComponent,
  CopyDialogInterface
} from '../dialogs/dialog-copy.component';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  AppDialogUploadFilesComponent,
  UploadDialogInterface
} from '../dialogs/dialog-upload.component';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import {
  AppDialogMoveComponent,
  MoveDialogInterface
} from '../dialogs/dialog-move.component';
import * as path from 'path-browserify';
import { LoggerService } from '../logging/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  templateUrl: 'file-manager.component.html',
  styleUrls: ['file-manager.component.scss', '../shared-utility-styles.scss']
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
    private optimisticFs: OptimisticFilesystemService,
    private logger: LoggerService
  ) {}

  // Getters

  get $CurrentPath() {
    return this.optimisticFs.$CurrentPath;
  }

  private async getCurrentPath() {
    const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
    return currentPath;
  }

  get $CurrentPathIsRoot() {
    return this.$CurrentPath.pipe(map(p => p === this.config.initialPath));
  }

  get $SelectedFile() {
    return this.optimisticFs.$SelectedFile;
  }

  async ngOnInit() {
    if (!this.fileSystem) {
      throw new Error(
        '<ngx-filemanager> must have input selector [fileSystem] set'
      );
    }
    this.optimisticFs.initialize(this.fileSystem);
    this.makeConfig();
    if (this.config && this.config.initialPath) {
      await this.optimisticFs.HandleList(this.config.initialPath);
    }
  }

  makeConfig() {
    const filesWithIcons$ = this.optimisticFs.$FilesWithIcons;
    this.autoTableConfig = {
      data$: filesWithIcons$,
      // debug: true,
      actionsBulk: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (files: ResFile[]) => this.onCopyMultiple(files)
        }
      ],
      actions: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (file: ResFile) => this.onCopyMultiple([file])
        },
        {
          label: 'Move',
          icon: 'forward',
          onClick: async (file: ResFile) => this.onMoveMultiple([file])
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
          onClick: async (file: ResFile) => this.onDeleteMultiple([file])
        }
      ],
      onSelectedBulk: (files: ResFile[]) => {
        this.logger.info('file-manager: onSelectedBulk', {
          files,
          length: files.length
        });
        this.$BulkSelected.next(files);
      },
      onSelectItemDoubleClick: async (item: ResFile) => {
        this.logger.info('file-manager: onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.$triggerClearSelected.next();
          await this.optimisticFs.HandleList(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        this.logger.info('file-manager: onSelectItem!', { item });
        this.optimisticFs.onSelectItem(item);
      },
      $triggerSelectItem: this.$SelectedFile,
      $triggerClearSelected: this.$triggerClearSelected,
      filterText: 'Search here...',
      hideChooseColumns: true,
      hideFilter: true
    };
  }

  private async onRename(file: ResFile) {
    const renamedPath = await this.openDialog(AppDialogRenameComponent, {
      currentFilename: file.name,
      currentPath: file.fullPath
    } as RenameDialogInterface);
    if (!renamedPath) {
      return;
    }
    await this.optimisticFs.HandleRename(file.fullPath, renamedPath);
    this.refreshExplorer();
  }

  private async onMoveMultiple(files: ResFile[]) {
    const renamedPath = await this.openDialog(AppDialogMoveComponent, {
      files: files
    } as MoveDialogInterface);
    if (!renamedPath) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleMoveMultiple(filePaths, renamedPath);
    this.refreshExplorer();
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
    await this.optimisticFs.HandleSetPermissions(
      file.fullPath,
      newPermissions,
      null
    );
    this.refreshExplorer();
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
    await this.optimisticFs.HandleSetPermissionsMultiple(
      filePaths,
      newPermissions,
      null
    );
    this.refreshExplorer();
  }

  private async onCopyMultiple(files: ResFile[]) {
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, {
      files: files
    } as CopyDialogInterface);
    if (!newFolderPath) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleCopyMultiple(filePaths, newFolderPath);
    this.refreshExplorer();
  }

  public async onClickDownload(file: ResFile) {
    const url = await this.fileSystem.CreateDownloadLink(file);
    this.logger.info('file-manager: downloading file', { file, url });
    const link = document.createElement('a');
    link.download = file.name;
    link.target = '_blank';
    link.href = url;
    link.click();
  }

  public async onClickRename(file: ResFile) {
    await this.onRename(file);
  }

  private async onDeleteMultiple(files: ResFile[]) {
    this.logger.info('file-manager: deleting files', { files });
    const deletedPaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleRemove(deletedPaths);
    this.refreshExplorer();
  }

  public async onClickDelete(file: ResFile) {
    await this.onDeleteMultiple([file]);
    this.refreshExplorer();
  }

  public async onClickNewFolder() {
    this.logger.info('file-manager: onClickNewFolder');
    const newDirName = await this.openDialog(AppDialogNewFolderComponent);
    if (!newDirName) {
      this.logger.info('file-manager: onClickNewFolder   no folder created...');
      return;
    }
    const currentDirectory = await this.getCurrentPath();
    const newDirectoryPath = path.join(currentDirectory, newDirName);
    await this.optimisticFs.HandleCreateFolder(newDirectoryPath);
    this.refreshExplorer();
  }

  public async onClickUpFolder() {
    this.logger.info('file-manager: onClickUpFolder');
    await this.optimisticFs.HandleNavigateUp();
    this.refreshExplorer();
  }

  public async onClickUploadFiles() {
    this.logger.info('file-manager: onClickUpload');
    const currentPath = await this.getCurrentPath();
    const data: UploadDialogInterface = {
      currentPath: currentPath,
      uploadApiUrl: this.fileSystem.GetUploadApiUrl(currentPath)
    };
    const res = await this.openDialog(AppDialogUploadFilesComponent, data);
    this.refreshExplorer();
  }

  public async onClickRefresh() {
    this.refreshExplorer();
  }

  public async onClickedCancelBulk() {
    this.logger.info('file-manager: onClickCancelBulk');
    this.clearBulkSelected();
  }

  public async onClickedBulkCopy() {
    this.logger.info('file-manager: clickedBulkCopy');
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    await this.onCopyMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickedBulkMove() {
    this.logger.info('file-manager: clickedBulkMove');
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    await this.onMoveMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickedBulkDelete() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    this.clearBulkSelected();
    await this.onDeleteMultiple(selected);
    this.refreshExplorer();
  }

  public async onClickedBulkPermissions() {
    this.logger.info('file-manager: clickedBulkPermissions');
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    await this.onSetPermissionsMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickCrumb(newPath: string) {
    this.clearBulkSelected();
    await this.optimisticFs.HandleList(newPath);
  }

  private clearBulkSelected() {
    this.$triggerClearSelected.next();
    this.$BulkSelected.next([]);
  }

  private async refreshExplorer() {
    const currentPath = await this.getCurrentPath();
    await this.optimisticFs.HandleList(currentPath);
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
