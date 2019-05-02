import { Injectable, OnDestroy } from '@angular/core';
import { OptimisticFilesystem } from './optimistic-filesystem.interface';
import { ClientFileSystemService } from './client-filesystem.service';
import { take, takeUntil, debounceTime, tap } from 'rxjs/operators';
import { LoggerService } from '../logging/logger.service';
import * as path from 'path-browserify';
import { NotificationService } from '../notifications/notification.service';
import { Subject } from 'rxjs';
import { FileSystemProvider, CoreTypes } from 'ngx-filemanager-core/public_api';

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
    private notifications: NotificationService
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
        tap((currentPath) => {
          this.clientFilesystem.OnList(currentPath);
        }),
        debounceTime(800)
      )
      .subscribe(async (currentPath) => {
        this.updateListFromServer(currentPath);
      });
  }

  private reportError(error: Error, msg: string, title: string) {
    this.logger.error('optimistic-filesystem:', {error, title, msg});
    this.notifications.notify(error.message, title);
  }

  private async updateListFromServer(directoryPath: string) {
    try {
      this.logger.info('onHandleList', { directoryPath });
      const apiResult = await this.serverFilesystem.List(directoryPath);
      await this.clientFilesystem.UpdateList(apiResult, directoryPath);
      const currentDirectory = await this.$CurrentPath.pipe(take(1)).toPromise();
      if (currentDirectory === directoryPath) {
        this.clientFilesystem.OnList(directoryPath);
        await this.selectFirstInCurrentDirectory();
      }
    } catch (error) {
      this.reportError(error, 'Cannot get directory list', 'List Error');
    }
  }

  async HandleList(directoryPath: string): Promise<any> {
    this.refreshEmitter.next(directoryPath);
  }
  async HandleCreateFolder(newPath: string): Promise<any> {
    try {
      this.logger.info('HandleCreateFolder', { newPath });
      this.clientFilesystem.OnCreateFolder(newPath);
      await this.serverFilesystem.CreateFolder(newPath);
    } catch (error) {
      this.reportError(error, 'Cannot create folder', 'Create Folder Error');
      this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleCopy(singleFileName: string, newPath: string): Promise<any> {
    try {
      this.logger.info('HandleCopy', { singleFileName, newPath });
      this.clientFilesystem.OnCopy(singleFileName, newPath);
      await this.serverFilesystem.Copy(singleFileName, newPath);
    } catch (error) {
      this.reportError(error, 'Cannot copy item', 'Copy Error');
      this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleMove(item: string, newPath: string): Promise<any> {
    try {
      this.logger.info('HandleMove', { item, newPath });
      this.clientFilesystem.OnMove(item, newPath);
      await this.serverFilesystem.Move(item, newPath);
    } catch (error) {
      this.reportError(error, 'Cannot move item', 'Move Error');
      this.clientFilesystem.OnRemove([newPath]);
    }
  }
  async HandleRename(item: string, newItemPath: string): Promise<any> {
    try {
      this.logger.info('HandleRename', { item, newItemPath });
      this.clientFilesystem.OnRename(item, newItemPath);
      await this.serverFilesystem.Rename(item, newItemPath);
    } catch (error) {
      this.reportError(error, 'Cannot rename item', 'Rename Error');
      this.clientFilesystem.OnRename(newItemPath, item);
    }
  }
  async HandleEdit(item: string, content: string): Promise<any> {
    try {
      this.logger.info('HandleEdit', { item, content });
      this.clientFilesystem.OnEdit(item, content);
      await this.serverFilesystem.Edit(item, content);
    } catch (error) {
      this.reportError(error, 'Cannot edit item', 'Edit Error');
    }
  }
  async HandleGetcontent(item: string): Promise<string> {
    try {
      this.logger.info('HandleGetcontent', { item });
      this.clientFilesystem.OnGetcontent(item);
      const response = await this.serverFilesystem.Getcontent(item);
      return response.result;
    } catch (error) {
      this.reportError(error, 'Cannot get item', 'Get Content Error');
    }
  }
  async HandleSetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.logger.info('HandleSetPermissions', {
        item,
        role,
        entity,
        recursive
      });
      this.clientFilesystem.OnSetPermissions(item, role, entity, recursive);
      await this.serverFilesystem.SetPermissions(item, role, entity, recursive);
    } catch (error) {
      this.reportError(error, 'Cannot set permissions to item', 'Permissions Error');
    }
  }
  async HandleMoveMultiple(items: string[], newPath: string): Promise<any> {
    try {
      this.logger.info('HandleMoveMultiple', { items, newPath });
      this.clientFilesystem.OnMoveMultiple(items, newPath);
      await this.serverFilesystem.MoveMultiple(items, newPath);
    } catch (error) {
      this.reportError(error, 'Cannot move items', 'Move Error');
    }
  }
  async HandleCopyMultiple(items: string[], newPath: string): Promise<any> {
    try {
      this.logger.info('HandleCopyMultiple', { items, newPath });
      this.clientFilesystem.OnCopyMultiple(items, newPath);
      await this.serverFilesystem.CopyMultiple(items, newPath);
    } catch (error) {
      this.reportError(error, 'Cannot copy items', 'Copy Error');
    }
  }
  async HandleSetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.logger.info('HandleSetPermissionsMultiple', {
        items,
        role,
        entity,
        recursive
      });
      this.clientFilesystem.OnSetPermissionsMultiple(
        items,
        role,
        entity,
        recursive
      );
      await this.serverFilesystem.SetPermissionsMultiple(
        items,
        role,
        entity,
        recursive
      );
    } catch (error) {
      this.reportError(error, 'Cannot set permissions to items', 'Permissions Error');
    }
  }
  async HandleSetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<any> {
    try {
      this.logger.info('HandleSetPermissionsMultiple', {
        items,
        permissionsObj,
        recursive
      });
      this.clientFilesystem.OnSetPermissionsObjectMultiple(
        items,
        permissionsObj,
        recursive
      );
      await this.serverFilesystem.SetPermissionsObjectMultiple(
        items,
        permissionsObj,
        recursive
      );
    } catch (error) {
      this.reportError(error, 'Cannot set permissions to items', 'Permissions Error');
    }
  }
  async HandleRemove(items: string[]): Promise<any> {
    try {
      this.logger.info('HandleRemove', { items });
      this.clientFilesystem.OnRemove(items);
      await this.serverFilesystem.Remove(items);
    } catch (error) {
      this.reportError(error, 'Cannot remove items', 'Remove Error');
    }
  }

  async HandleNavigateUp(): Promise<any> {
    try {
      this.logger.info('HandleNavigateUp');
      const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
      const parentPath = path.dirname(currentPath);
      await this.HandleList(parentPath);
    } catch (error) {
      this.reportError(error, 'Cannot navigate to parent directory', 'Navigate Error');
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
