import { Injectable, OnDestroy } from '@angular/core';
import { FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { OptimisticFilesystem } from './optimistic-filesystem.interface';
import * as core from 'ngx-filemanager-core';
import { ClientFileSystemService } from './client-filesystem.service';
import { take, map } from 'rxjs/operators';
import { LoggerService } from '../logging/logger.service';
import * as path from 'path-browserify';
import { EnsurePrefixSlash } from '../utils/path-helpers';

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

  async HandleList(directoryPath: string): Promise<void> {
    this.logger.info('HandleList', { directoryPath });
    this.clientFilesystem.OnList(directoryPath);
    const apiResult = await this.serverFilesystem.List(directoryPath);
    await this.clientFilesystem.UpdateCurrentList(apiResult);
  }
  async HandleCreateFolder(newPath: string): Promise<void> {
    this.logger.info('HandleCreateFolder', { newPath });
    this.clientFilesystem.OnCreateFolder(newPath);
    await this.serverFilesystem.CreateFolder(newPath);
  }
  async HandleCopy(singleFileName: string, newPath: string): Promise<void> {
    this.logger.info('HandleCopy', { singleFileName, newPath });
    this.clientFilesystem.OnCopy(singleFileName, newPath);
    await this.serverFilesystem.Copy(singleFileName, newPath);
  }
  async HandleMove(item: string, newPath: string): Promise<void> {
    this.logger.info('HandleMove', { item, newPath });
    this.clientFilesystem.OnMove(item, newPath);
    await this.serverFilesystem.Move(item, newPath);
  }
  async HandleRename(item: string, newItemPath: string): Promise<void> {
    this.logger.info('HandleRename', { item, newItemPath });
    this.clientFilesystem.OnRename(item, newItemPath);
    await this.serverFilesystem.Rename(item, newItemPath);
  }
  async HandleEdit(item: string, content: string): Promise<void> {
    this.logger.info('HandleEdit', { item, content });
    this.clientFilesystem.OnRename(item, content);
    await this.serverFilesystem.Rename(item, content);
  }
  async HandleGetcontent(item: string): Promise<string> {
    this.logger.info('HandleGetcontent', { item });
    this.clientFilesystem.OnGetcontent(item);
    const response = await this.serverFilesystem.Getcontent(item);
    return response.result;
  }
  async HandleSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void> {
    this.logger.info('HandleSetPermissions', {
      item,
      perms,
      permsCode,
      recursive
    });
    this.clientFilesystem.OnSetPermissions(item, perms, permsCode, recursive);
    await this.serverFilesystem.SetPermissions(
      item,
      perms,
      permsCode,
      recursive
    );
  }
  async HandleMoveMultiple(items: string[], newPath: string): Promise<void> {
    this.logger.info('HandleMoveMultiple', { items, newPath });

    this.clientFilesystem.OnMoveMultiple(items, newPath);
    await this.serverFilesystem.MoveMultiple(items, newPath);
  }
  async HandleCopyMultiple(items: string[], newPath: string): Promise<void> {
    this.logger.info('HandleCopyMultiple', { items, newPath });

    this.clientFilesystem.OnCopyMultiple(items, newPath);
    await this.serverFilesystem.CopyMultiple(items, newPath);
  }
  async HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void> {
    this.logger.info('HandleSetPermissionsMultiple', {
      items,
      perms,
      permsCode,
      recursive
    });

    this.clientFilesystem.OnSetPermissionsMultiple(
      items,
      perms,
      permsCode,
      recursive
    );
    await this.serverFilesystem.SetPermissionsMultiple(
      items,
      perms,
      permsCode,
      recursive
    );
  }
  async HandleRemove(items: string[]): Promise<void> {
    this.logger.info('HandleRemove', { items });

    this.clientFilesystem.OnRemove(items);
    await this.serverFilesystem.Remove(items);
  }

  async HandleNavigateUp(): Promise<void> {
    this.logger.info('HandleNavigateUp');
    const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
    const parentPath = path.dirname(currentPath);
    await this.HandleList(parentPath);
    this.selectFirstInCurrentDirectory();
  }

  async onSelectItem(file: core.ResFile) {
    this.clientFilesystem.onSelectItem(file);
  }

  async selectFirstInCurrentDirectory() {
    const currentFiles = await this.clientFilesystem.$currentFiles
      .pipe(take(1))
      .toPromise();
    const firstSelected = [...currentFiles].shift();
    this.clientFilesystem.onSelectItem(firstSelected);
  }
}
