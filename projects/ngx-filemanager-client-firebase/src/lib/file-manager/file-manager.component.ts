import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/public_api';
import { take, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AppDialogNewFolderComponent } from '../dialogs/dialog-new-folder.component';
import { RenameDialogInterface } from '../dialogs/dialog-rename.component';
import { AppDialogRenameComponent } from '../dialogs/dialog-rename.component';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core';
import { FileManagerConfig } from '../configuration/client-configuration';
import { AppDialogSetPermissionsComponent, PermissionsDialogResponseInterface } from '../dialogs/dialog-setpermissions.component';
import { PermissionsDialogInterface } from '../dialogs/dialog-setpermissions.component';
import {
  AppDialogCopyComponent,
  CopyDialogInterface
} from '../dialogs/dialog-copy-or-move.component';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  AppDialogUploadFilesComponent,
  UploadDialogInterface
} from '../dialogs/dialog-upload.component';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import * as path from 'path-browserify';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  templateUrl: 'file-manager.component.html',
  styleUrls: ['file-manager.component.scss', '../shared-utility-styles.scss'],
  providers: [
    ClientFileSystemService,
    OptimisticFilesystemService
  ]
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
    private clientFilesystem: ClientFileSystemService,
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
    this.optimisticFs.initialize(this.fileSystem, this.clientFilesystem);
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
          onClick: async (file: ResFile) => this.onSetPermissionsMultiple([file])
        },
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: ResFile) => this.onDeleteMultiple([file])
        }
      ],
      onSelectedBulk: (files: ResFile[]) => {
        this.logger.info('onSelectedBulk', {
          files,
          length: files.length
        });
        this.$BulkSelected.next(files);
      },
      onSelectItemDoubleClick: async (item: ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.clearBulkSelected();
          await this.optimisticFs.HandleList(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        this.logger.info('onSelectItem!', { item });
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
    const data: RenameDialogInterface = {
      currentPath: file.fullPath
    };
    this.logger.info('onRename', {data});
    const renamedPath = await this.openDialog(AppDialogRenameComponent, data);
    if (!renamedPath) {
      return;
    }
    await this.optimisticFs.HandleRename(file.fullPath, renamedPath);
    await this.refreshExplorer();
    setTimeout(() => {
      this.optimisticFs.onSelectItemByName(renamedPath);
    }, 300);
  }

  private async onMoveMultiple(files: ResFile[]) {
    const data: CopyDialogInterface = {
      files: files,
      isCopy: false,
      serverFilesystem: this.fileSystem
    };
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, data);
    if (!newFolderPath) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleMoveMultiple(filePaths, newFolderPath);
    await this.refreshExplorer();
  }

  private async onCopyMultiple(files: ResFile[]) {
    const data: CopyDialogInterface = {
      files: files,
      isCopy: true,
      serverFilesystem: this.fileSystem
    };
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, data);
    this.logger.info('onCopyMultiple', {files, newFolderPath});
    if (!newFolderPath) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleCopyMultiple(filePaths, newFolderPath);
    await this.refreshExplorer();
  }

  private async onSetPermissionsMultiple(files: ResFile[]) {
    const data: PermissionsDialogInterface = {
      files: files,
      config: this.config
    };
    const res: PermissionsDialogResponseInterface = await this.openDialog(
      AppDialogSetPermissionsComponent,
      data
    );
    if (!res) {
      return;
    }
    const filePaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleSetPermissionsMultiple(
      filePaths,
      res.role,
      res.entity,
      true
    );
    await this.refreshExplorer();
  }

  public async onDetailsClickDelete(file: ResFile) {
    await this.onDeleteMultiple([file]);
  }
  public async onDetailsClickDownload(file: ResFile) {
    const url = await this.fileSystem.CreateDownloadLink(file);
    this.logger.info('downloading file', { file, url });
    const link = document.createElement('a');
    link.download = file.name;
    link.target = '_blank';
    link.href = url;
    link.click();
  }
  public async onDetailsClickRename(file: ResFile) {
    await this.onRename(file);
  }
  public async onDetailsClickSinglePermissions(file: ResFile) {
    await this.onSetPermissionsMultiple([file]);
    this.optimisticFs.onSelectItemByName(file.fullPath);
  }

  private async onDeleteMultiple(files: ResFile[]) {
    this.logger.info('deleting files', { files });
    const deletedPaths = files.map(f => f.fullPath);
    await this.optimisticFs.HandleRemove(deletedPaths);
    await this.refreshExplorer();
  }

  public async onClickNewFolder() {
    this.logger.info('onClickNewFolder');
    const newDirName = await this.openDialog(AppDialogNewFolderComponent);
    if (!newDirName) {
      this.logger.info('onClickNewFolder   no folder created...');
      return;
    }
    const currentDirectory = await this.getCurrentPath();
    const newDirectoryPath = path.join(currentDirectory, newDirName);
    await this.optimisticFs.HandleCreateFolder(newDirectoryPath);
    await this.refreshExplorer();
  }

  public async onClickUpFolder() {
    this.logger.info('onClickUpFolder');
    await this.optimisticFs.HandleNavigateUp();
  }

  public async onClickUploadFiles() {
    this.logger.info('onClickUpload');
    const currentPath = await this.getCurrentPath();
    const data: UploadDialogInterface = {
      currentPath: currentPath,
      uploadApiUrl: this.fileSystem.GetUploadApiUrl(currentPath)
    };
    const res = await this.openDialog(AppDialogUploadFilesComponent, data);
    await this.refreshExplorer();
  }

  public async onClickRefresh() {
    await this.refreshExplorer();
  }

  public async onClickedCancelBulk() {
    this.logger.info('onClickCancelBulk');
    this.clearBulkSelected();
  }

  public async onClickedBulkCopy() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    const selectedCopied = [...selected];
    this.logger.info('clickedBulkCopy', {selectedCopied});
    await this.onCopyMultiple(selectedCopied);
    this.clearBulkSelected();
  }

  public async onClickedBulkMove() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    this.logger.info('clickedBulkMove', {selected});
    await this.onMoveMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickedBulkDelete() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    this.clearBulkSelected();
    await this.onDeleteMultiple(selected);
  }

  public async onClickedBulkPermissions() {
    this.logger.info('clickedBulkPermissions');
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    await this.onSetPermissionsMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickCrumb(newPath: string) {
    this.clearBulkSelected();
    this.logger.info('onClickCrumb', {newPath});
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
