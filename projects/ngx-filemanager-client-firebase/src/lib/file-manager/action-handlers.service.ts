import { Injectable } from '@angular/core';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { MatDialog } from '@angular/material';
import {
  RenameDialogInterface,
  AppDialogRenameComponent
} from '../dialogs/dialog-rename.component';
import { take, map, debounceTime, takeUntil } from 'rxjs/operators';
import {
  AppDialogCopyComponent,
  CopyDialogInterface
} from '../dialogs/dialog-copy-or-move.component';
import {
  PermissionsDialogInterface,
  PermissionsDialogResponseInterface,
  AppDialogSetPermissionsComponent
} from '../dialogs/dialog-setpermissions.component';
import { FileManagerConfig } from '../configuration/client-configuration';
import { AppDialogNewFolderComponent } from '../dialogs/dialog-new-folder.component';
import * as path from 'path-browserify';
import {
  UploadDialogInterface,
  AppDialogUploadFilesComponent
} from '../dialogs/dialog-upload.component';
import { LoggerService } from '../logging/logger.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class ActionHandlersService {
  private fileSystem: FileSystemProvider;
  private config: FileManagerConfig;

  // Getters

  get $CurrentPath() {
    return this.optimisticFs.$CurrentPath;
  }

  public async GetCurrentPath() {
    return this.$CurrentPath.pipe(take(1)).toPromise();
  }

  get $CurrentPathIsRoot() {
    return this.$CurrentPath.pipe(map(p => p === this.config.virtualRoot));
  }

  get $SelectedFile() {
    return this.optimisticFs.$SelectedFile;
  }

  get $FilesWithIcons() {
    return this.optimisticFs.$FilesWithIcons;
  }

  constructor(
    private clientFilesystem: ClientFileSystemService,
    private optimisticFs: OptimisticFilesystemService,
    private dialog: MatDialog,
    private logger: LoggerService,
    private notifications: NotificationService
  ) {}

  public init(fileSystem: FileSystemProvider, config: FileManagerConfig) {
    this.config = config;
    this.fileSystem = fileSystem;
    this.optimisticFs.initialize(this.fileSystem, this.clientFilesystem);
  }

  public async OnRename(file: ResFile) {
    const data: RenameDialogInterface = {
      currentPath: file.fullPath
    };
    this.logger.info('OnRename', { data });
    const renamedPath = await this.openDialog(AppDialogRenameComponent, data);
    if (!renamedPath) {
      this.notifications.notifyCancelled();
      return;
    }
    try {
      await this.optimisticFs.HandleRename(file.fullPath, renamedPath);
      await this.RefreshExplorer();
      setTimeout(() => {
        this.optimisticFs.onSelectItemByName(renamedPath);
      }, 300);
    } catch (error) {
      this.logger.error('OnRename', { error });
      this.notifications.notify(error.message, 'Rename Error');
    }
  }

  public async OnMoveMultiple(files: ResFile[]) {
    const data: CopyDialogInterface = {
      files: files,
      isCopy: false,
      serverFilesystem: this.fileSystem
    };
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, data);
    if (!newFolderPath) {
      this.notifications.notifyCancelled();
      return;
    }
    try {
      const filePaths = files.map(f => f.fullPath);
      await this.optimisticFs.HandleMoveMultiple(filePaths, newFolderPath);
      await this.RefreshExplorer();
    } catch (error) {
      this.logger.error('OnMoveMultiple', { error });
      this.notifications.notify(error.message, 'Move Error');
    }
  }

  public async OnCopyMultiple(files: ResFile[]) {
    const data: CopyDialogInterface = {
      files: files,
      isCopy: true,
      serverFilesystem: this.fileSystem
    };
    const newFolderPath = await this.openDialog(AppDialogCopyComponent, data);
    this.logger.info('OnCopyMultiple', { files, newFolderPath });
    if (!newFolderPath) {
      this.notifications.notifyCancelled();
      return;
    }
    try {
      const filePaths = files.map(f => f.fullPath);
      await this.optimisticFs.HandleCopyMultiple(filePaths, newFolderPath);
      await this.RefreshExplorer();
    } catch (error) {
      this.logger.error('OnCopyMultiple', { error });
      this.notifications.notify(error.message, 'Copy Error');
    }
  }

  public async OnSetPermissionsMultiple(files: ResFile[]) {
    const data: PermissionsDialogInterface = {
      files: files,
      config: this.config
    };
    try {
      if (!this.config.users) {
        throw new Error('The "config.users" property was not defined');
      }
      if (!this.config.groups) {
        throw new Error('The "config.groups" property was not defined');
      }
    } catch (error) {
      this.notifications.notify(error.message, 'Permissions Error');
      return;
    }

    const res: PermissionsDialogResponseInterface = await this.openDialog(
      AppDialogSetPermissionsComponent,
      data
    );
    if (!res) {
      this.notifications.notifyCancelled();
      return;
    }
    try {
      const filePaths = files.map(f => f.fullPath);
      await this.optimisticFs.HandleSetPermissionsMultiple(
        filePaths,
        res.role,
        res.entity,
        true
      );
      await this.RefreshExplorer();
    } catch (error) {
      this.logger.error('OnSetPermissionsMultiple', { error });
      this.notifications.notify(error.message, 'Permissions Error');
    }
  }

  public async OnDeleteMultiple(files: ResFile[]) {
    try {
      const deletedPaths = files.map(f => f.fullPath);
      this.logger.info('deleting files', { files, deletedPaths });
      await this.optimisticFs.HandleRemove(deletedPaths);
      await this.RefreshExplorer();
    } catch (error) {
      this.logger.error('OnDeleteMultiple', { error });
      this.notifications.notify(error.message, 'Deletion Error');
    }
  }

  // Misc

  public async OnNavigateTo(folderPath: string) {
    this.logger.info('action-handlers.OnNavigateTo', { folderPath });
    this.optimisticFs.HandleList(folderPath);
  }

  public async OnNavigateToParent() {
    this.logger.info('OnNavigateToParent');
    await this.optimisticFs.HandleNavigateUp();
  }

  public async OnSelectItemByPath(itemPath: string) {
    this.optimisticFs.onSelectItemByName(itemPath);
  }

  public async OnUploadFilesToCurrentDirectory() {
    this.logger.info('onClickUpload');
    const currentPath = await this.GetCurrentPath();
    const data: UploadDialogInterface = {
      currentPath: currentPath,
      uploadApiUrl: this.fileSystem.GetUploadApiUrl(currentPath)
    };
    const res = await this.openDialog(AppDialogUploadFilesComponent, data);
    await this.optimisticFs.HandleList(currentPath);
  }

  public async OnNewFolderInCurrentDirectory() {
    this.logger.info('onClickNewFolder');
    const newDirName = await this.openDialog(AppDialogNewFolderComponent);
    if (!newDirName) {
      this.logger.info('onClickNewFolder   no folder created...');
      return;
    }
    const currentDirectory = await this.GetCurrentPath();
    const newDirectoryPath = path.join(currentDirectory, newDirName);
    await this.optimisticFs.HandleCreateFolder(newDirectoryPath);
    await this.optimisticFs.HandleList(currentDirectory);
  }

  public async OnDownloadFile(file: ResFile) {
    const url = await this.fileSystem.CreateDownloadLink(file);
    this.logger.info('downloading file', { file, url });
    const link = document.createElement('a');
    link.download = file.name;
    link.target = '_blank';
    link.href = url;
    link.click();
  }

  public async RefreshExplorer() {
    const currentPath = await this.GetCurrentPath();
    this.optimisticFs.HandleList(currentPath);
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
