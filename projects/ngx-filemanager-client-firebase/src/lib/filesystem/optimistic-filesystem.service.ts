import { Injectable, OnDestroy } from '@angular/core';
import { OptimisticFilesystem } from './optimistic-filesystem.interface';
import { ClientFileSystemService } from './client-filesystem.service';
import { take, takeUntil, debounceTime, tap, switchMap } from 'rxjs/operators';
import { LoggerService } from '../logging/logger.service';
import * as path from 'path-browserify';
import { NotificationService } from '../notifications/notification.service';
import { Subject } from 'rxjs';
import { FileSystemProvider, CoreTypes } from 'ngx-filemanager-core/public_api';
import { FilemanagerStatusService } from './status.service';

import { v4 as uuidv4 } from 'uuid';

// tslint:disable:member-ordering

@Injectable()
export class OptimisticFilesystemService
  implements OptimisticFilesystem, OnDestroy {
  private serverFilesystem: FileSystemProvider;
  private clientFilesystem: ClientFileSystemService;

  private static instanceCount = 0;
  private instanceCountIncr() {
    OptimisticFilesystemService.instanceCount++;
    this.logger.info('new instance created', { instances: this.instances });
  }
  private instanceCountDecr() {
    OptimisticFilesystemService.instanceCount--;
    this.logger.info('instance destroyed', { instances: this.instances });
  }
  get instances() {
    return OptimisticFilesystemService.instanceCount;
  }

  constructor(
    private logger: LoggerService,
    private notifications: NotificationService,
    private status: FilemanagerStatusService
  ) {
    this.instanceCountIncr();
  }

  ngOnDestroy() {
    this.instanceCountDecr();
  }

  get $CurrentPath() {
    return this.clientFilesystem.$currentPath;
  }

  get $SelectedFile() {
    return this.clientFilesystem.$selectedFile;
  }

  get $FilesWithIcons() {
    return this.clientFilesystem.$FilesWithIcons;
  }

  private refreshEmitter = new Subject<string>();
  private destroyed = new Subject();

  initialize(
    serverFilesystem: FileSystemProvider,
    clientFilesystem: ClientFileSystemService
  ) {
    this.logger.info('initializing...', { serverFilesystem, clientFilesystem });
    this.serverFilesystem = serverFilesystem;
    this.clientFilesystem = clientFilesystem;

    this.destroyed.next();
    this.refreshEmitter
      .pipe(
        takeUntil(this.destroyed),
        debounceTime(800),
        tap(async currentPath => {
          return this.clientFilesystem.OnList(currentPath);
        })
      )
      .subscribe(async currentPath => {
        return this.updateListFromServer(currentPath);
      });
  }

  private reportError(error: Error, msg: string, title: string) {
    this.logger.error('optimistic-filesystem:', { error, title, msg });
    this.notifications.notify(error.message, title);
  }

  private async updateListFromServer(directoryPath: string) {
    try {
      this.status.UpdateStatus(directoryPath, 'SENDING');
      this.logger.info('updateListFromServer', { directoryPath });
      const apiResult = await this.serverFilesystem.List(directoryPath);
      await this.clientFilesystem.UpdateList(apiResult, directoryPath);
      const currentDirectory = await this.$CurrentPath
        .pipe(take(1))
        .toPromise();
      if (currentDirectory === directoryPath) {
        await Promise.all([
          this.clientFilesystem.OnList(directoryPath),
          this.selectFirstInCurrentDirectory()
        ]);
      }
      this.status.UpdateStatus(directoryPath, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot get directory list', 'List Error');
      this.status.UpdateStatus(directoryPath, 'FAILED', error);
    }
  }

  async HandleList(directoryPath: string): Promise<any> {
    this.refreshEmitter.next(directoryPath);
  }
  async HandleCreateFolder(newPath: string): Promise<any> {
    try {
      this.status.UpdateStatus(newPath, 'SENDING');
      this.logger.info('HandleCreateFolder', { newPath });
      await Promise.all([
        this.clientFilesystem.OnCreateFolder(newPath),
        this.serverFilesystem.CreateFolder(newPath)
      ]);
      this.status.UpdateStatus(newPath, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot create folder', 'Create Folder Error');
      this.status.UpdateStatus(newPath, 'FAILED', error);
      await this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleUpload(uploadedFiles: string[]): Promise<any> {
    this.status.UpdateStatus('HandleUpload', 'SENDING');
    this.logger.info('HandleUpload', { uploadedFiles });
    const uploadAll = uploadedFiles.map(f => this.serverFilesystem.Upload(f));
    await Promise.all([
      this.clientFilesystem.OnUploadedFiles(uploadedFiles),
      uploadAll
    ]);
    this.status.UpdateStatus('HandleUpload', 'SUCCESS');
  }
  async HandleCopy(singleFileName: string, newPath: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleCopy' + singleFileName, 'SENDING');
      this.logger.info('HandleCopy', { singleFileName, newPath });
      await Promise.all([
        this.clientFilesystem.OnCopy(singleFileName, newPath),
        this.serverFilesystem.Copy(singleFileName, newPath)
      ]);
      this.status.UpdateStatus('HandleCopy' + singleFileName, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot copy item', 'Copy Error');
      this.status.UpdateStatus('HandleCopy' + singleFileName, 'FAILED', error);
      return this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleMove(item: string, newPath: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleMove' + item, 'SENDING');
      this.logger.info('HandleMove', { item, newPath });
      await Promise.all([
        this.clientFilesystem.OnMove(item, newPath),
        this.serverFilesystem.Move(item, newPath)
      ]);
      this.status.UpdateStatus('HandleMove' + item, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot move item', 'Move Error');
      this.status.UpdateStatus('HandleMove' + item, 'FAILED');
      return this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleRename(item: string, newItemPath: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleRename' + item, 'SENDING');
      this.logger.info('HandleRename', { item, newItemPath });
      await Promise.all([
        this.clientFilesystem.OnRename(item, newItemPath),
        this.serverFilesystem.Rename(item, newItemPath)
      ]);
      this.status.UpdateStatus('HandleRename' + item, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot rename item', 'Rename Error');
      this.status.UpdateStatus('HandleRename' + item, 'FAILED');
      return this.clientFilesystem.OnRename(newItemPath, item);
    }
  }
  async HandleEdit(item: string, content: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleEdit' + item, 'SENDING');
      this.logger.info('HandleEdit', { item, content });
      await Promise.all([
        this.clientFilesystem.OnEdit(item, content),
        this.serverFilesystem.Edit(item, content)
      ]);
      this.status.UpdateStatus('HandleEdit' + item, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot edit item', 'Edit Error');
      this.status.UpdateStatus('HandleEdit' + item, 'FAILED');
    }
  }
  async HandleGetcontent(item: string): Promise<string> {
    try {
      this.status.UpdateStatus('HandleGetcontent' + item, 'SENDING');
      this.logger.info('HandleGetcontent', { item });
      await this.clientFilesystem.OnGetcontent(item);
      const response = await this.serverFilesystem.Getcontent(item);
      this.status.UpdateStatus('HandleGetcontent' + item, 'SUCCESS');
      return response.result;
    } catch (error) {
      this.reportError(error, 'Cannot get item', 'Get Content Error');
      this.status.UpdateStatus('HandleGetcontent' + item, 'FAILED');
    }
  }
  async HandleSetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.status.UpdateStatus('HandleSetPermissions' + item, 'SENDING');
      this.logger.info('HandleSetPermissions', {
        item,
        role,
        entity,
        recursive
      });
      await Promise.all([
        this.clientFilesystem.OnSetPermissions(item, role, entity, recursive),
        this.serverFilesystem.SetPermissions(item, role, entity, recursive)
      ]);
      this.status.UpdateStatus('HandleSetPermissions' + item, 'SUCCESS');
    } catch (error) {
      this.reportError(
        error,
        'Cannot set permissions to item',
        'Permissions Error'
      );
      this.status.UpdateStatus('HandleSetPermissions' + item, 'FAILED');
    }
  }
  async HandleMoveMultiple(items: string[], newPath: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleMoveMultiple' + items, 'SENDING');
      this.logger.info('HandleMoveMultiple', { items, newPath });
      await Promise.all([
        this.clientFilesystem.OnMoveMultiple(items, newPath),
        this.serverFilesystem.MoveMultiple(items, newPath)
      ]);
      this.status.UpdateStatus('HandleMoveMultiple' + items, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot move items', 'Move Error');
      this.status.UpdateStatus('HandleMoveMultiple' + items, 'FAILED');
    }
  }
  async HandleCopyMultiple(items: string[], newPath: string): Promise<any> {
    try {
      this.status.UpdateStatus('HandleCopyMultiple' + items, 'SENDING');
      this.logger.info('HandleCopyMultiple', { items, newPath });
      await Promise.all([
        this.clientFilesystem.OnCopyMultiple(items, newPath),
        this.serverFilesystem.CopyMultiple(items, newPath)
      ]);
      this.status.UpdateStatus('HandleCopyMultiple' + items, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot copy items', 'Copy Error');
      this.status.UpdateStatus('HandleCopyMultiple' + items, 'FAILED');
    }
  }
  async HandleSetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.status.UpdateStatus('HandleSetPermissionsMultiple' + items, 'SENDING');
      this.logger.info('HandleSetPermissionsMultiple', {
        items,
        role,
        entity,
        recursive
      });
      await Promise.all([
        this.clientFilesystem.OnSetPermissionsMultiple(
          items,
          role,
          entity,
          recursive
        ),
        this.serverFilesystem.SetPermissionsMultiple(
          items,
          role,
          entity,
          recursive
        )
      ]);
      this.status.UpdateStatus('HandleSetPermissionsMultiple' + items, 'SUCCESS');
    } catch (error) {
      this.reportError(
        error,
        'Cannot set permissions to items',
        'Permissions Error'
      );
      this.status.UpdateStatus('HandleSetPermissionsMultiple' + items, 'FAILED');
    }
  }
  async HandleSetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.status.UpdateStatus('HandleSetPermissionsObjectMultiple' + items, 'SENDING');
      this.logger.info('HandleSetPermissionsMultiple', {
        items,
        permissionsObj,
        recursive
      });
      await Promise.all([
        this.clientFilesystem.OnSetPermissionsObjectMultiple(
          items,
          permissionsObj,
          recursive
        ),
        this.serverFilesystem.SetPermissionsObjectMultiple(
          items,
          permissionsObj,
          recursive
        )
      ]);
      this.status.UpdateStatus('HandleSetPermissionsObjectMultiple' + items, 'SUCCESS');
    } catch (error) {
      this.reportError(
        error,
        'Cannot set permissions to items',
        'Permissions Error'
      );
      this.status.UpdateStatus('HandleSetPermissionsObjectMultiple' + items, 'FAILED');
    }
  }
  async HandleRemove(items: string[]): Promise<any> {
    try {
      this.status.UpdateStatus('HandleRemove' + items, 'SENDING');
      this.logger.info('HandleRemove', { items });
      await Promise.all([
        this.clientFilesystem.OnRemove(items),
        this.serverFilesystem.Remove(items)
      ]);
      this.status.UpdateStatus('HandleRemove' + items, 'SUCCESS');
    } catch (error) {
      this.reportError(error, 'Cannot remove items', 'Remove Error');
      this.status.UpdateStatus('HandleRemove' + items, 'FAILED');
    }
  }

  async HandleNavigateUp(): Promise<any> {
    const uuid = uuidv4();
    try {
      this.status.UpdateStatus('HandleNavigateUp' + uuid, 'SENDING');
      this.logger.info('HandleNavigateUp');
      const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
      const parentPath = path.dirname(currentPath);
      await this.HandleList(parentPath);
      this.status.UpdateStatus('HandleNavigateUp' + uuid, 'SUCCESS');
    } catch (error) {
      this.reportError(
        error,
        'Cannot navigate to parent directory',
        'Navigate Error'
      );
      this.status.UpdateStatus('HandleNavigateUp' + uuid, 'FAILED');
      throw new Error(error.message);
    }
  }

  async onSelectItem(file: CoreTypes.ResFile) {
    this.clientFilesystem.onSelectItem(file);
  }

  GetItemByName(filePath: string) {
    const currentFiles = this.clientFilesystem.CurrentFiles();
    const match = currentFiles.find(f => f.fullPath === filePath);
    return match;
  }

  onSelectItemByName(filePath: string) {
    const match = this.GetItemByName(filePath);
    this.clientFilesystem.onSelectItem(match);
  }

  private async selectFirstInCurrentDirectory() {
    const currentFiles = this.clientFilesystem.CurrentFiles();
    const firstSelected = [...currentFiles].shift();
    this.clientFilesystem.onSelectItem(firstSelected);
  }
}
