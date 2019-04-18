import { Injectable, OnDestroy } from '@angular/core';
import { FileSystemProvider, PermissionEntity } from 'ngx-filemanager-core/public_api';
import { OptimisticFilesystem } from './optimistic-filesystem.interface';
import * as core from 'ngx-filemanager-core';
import { ClientFileSystemService } from './client-filesystem.service';
import { take } from 'rxjs/operators';
import { LoggerService } from '../logging/logger.service';
import * as path from 'path-browserify';

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

  constructor(private logger: LoggerService) {
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

  initialize(
    serverFilesystem: FileSystemProvider,
    clientFilesystem: ClientFileSystemService
  ) {
    this.logger.info('initializing...', { serverFilesystem, clientFilesystem });
    this.serverFilesystem = serverFilesystem;
    this.clientFilesystem = clientFilesystem;
  }

  async HandleList(directoryPath: string): Promise<any> {
    this.logger.info('HandleList', { directoryPath });
    this.clientFilesystem.OnList(directoryPath);
    try {
      const apiResult = await this.serverFilesystem.List(directoryPath);
      await this.clientFilesystem.UpdateCurrentList(apiResult);
      await this.selectFirstInCurrentDirectory();
    } catch (error) {
      console.error('error in HandleList: ' + error.message);
    }
  }
  async HandleCreateFolder(newPath: string): Promise<any> {
    this.logger.info('HandleCreateFolder', { newPath });
    this.clientFilesystem.OnCreateFolder(newPath);
    return this.serverFilesystem.CreateFolder(newPath);
  }
  async HandleCopy(singleFileName: string, newPath: string): Promise<any> {
    this.logger.info('HandleCopy', { singleFileName, newPath });
    this.clientFilesystem.OnCopy(singleFileName, newPath);
    return this.serverFilesystem.Copy(singleFileName, newPath);
  }
  async HandleMove(item: string, newPath: string): Promise<any> {
    this.logger.info('HandleMove', { item, newPath });
    this.clientFilesystem.OnMove(item, newPath);
    return this.serverFilesystem.Move(item, newPath);
  }
  async HandleRename(item: string, newItemPath: string): Promise<any> {
    this.logger.info('HandleRename', { item, newItemPath });
    this.clientFilesystem.OnRename(item, newItemPath);
    return this.serverFilesystem.Rename(item, newItemPath);
  }
  async HandleEdit(item: string, content: string): Promise<any> {
    this.logger.info('HandleEdit', { item, content });
    this.clientFilesystem.OnRename(item, content);
    return this.serverFilesystem.Rename(item, content);
  }
  async HandleGetcontent(item: string): Promise<string> {
    this.logger.info('HandleGetcontent', { item });
    this.clientFilesystem.OnGetcontent(item);
    try {
      const response = await this.serverFilesystem.Getcontent(item);
      return response.result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async HandleSetPermissions(
    item: string,
    role: core.PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<any> {
    this.logger.info('HandleSetPermissions', {
      item,
      role,
      entity,
      recursive
    });
    this.clientFilesystem.OnSetPermissions(item, role, entity, recursive);
    return this.serverFilesystem.SetPermissions(
      item,
      role,
      entity,
      recursive
    );
  }
  async HandleMoveMultiple(items: string[], newPath: string): Promise<any> {
    this.logger.info('HandleMoveMultiple', { items, newPath });

    this.clientFilesystem.OnMoveMultiple(items, newPath);
    return this.serverFilesystem.MoveMultiple(items, newPath);
  }
  async HandleCopyMultiple(items: string[], newPath: string): Promise<any> {
    this.logger.info('HandleCopyMultiple', { items, newPath });

    this.clientFilesystem.OnCopyMultiple(items, newPath);
    return this.serverFilesystem.CopyMultiple(items, newPath);
  }
  async HandleSetPermissionsMultiple(
    items: string[],
    role: core.PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<any> {
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
    return this.serverFilesystem.SetPermissionsMultiple(
      items,
      role,
      entity,
      recursive
    );
  }
  async HandleRemove(items: string[]): Promise<any> {
    this.logger.info('HandleRemove', { items });

    this.clientFilesystem.OnRemove(items);
    return this.serverFilesystem.Remove(items);
  }

  async HandleNavigateUp(): Promise<any> {
    this.logger.info('HandleNavigateUp');
    try {
      const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
      const parentPath = path.dirname(currentPath);
      return this.HandleList(parentPath);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async onSelectItem(file: core.ResFile) {
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
