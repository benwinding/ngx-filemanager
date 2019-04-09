import { Injectable } from '@angular/core';
import { ClientFileSystem } from './client-filesystem';
import { FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { OptimisticFilesystem } from './optimistic-filesystem';
import * as core from 'ngx-filemanager-core';
import { ClientFileSystemService } from './client-filesystem.service';
import { take } from 'rxjs/operators';

// tslint:disable:member-ordering

@Injectable()
export class OptimisticFilesystemService implements OptimisticFilesystem {
  private serverFilesystem: FileSystemProvider;

  constructor(private clientFilesystem: ClientFileSystemService) {}

  get $CurrentPath() {
    return this.clientFilesystem.$currentPath;
  }

  get $SelectedFile() {
    return this.clientFilesystem.$selectedFile;
  }

  get $FilesWithIcons() {
    return this.clientFilesystem.$FilesWithIcons;
  }

  initialize(serverFilesystem: FileSystemProvider) {
    this.serverFilesystem = serverFilesystem;
  }

  async HandleList(path: string): Promise<void> {
    this.clientFilesystem.OnList(path);
    const apiResult = await this.serverFilesystem.List(path);
    await this.clientFilesystem.UpdateCurrentList(apiResult);
  }
  async HandleCreateFolder(newPath: string): Promise<void> {
    this.clientFilesystem.OnCreateFolder(newPath);
    await this.serverFilesystem.CreateFolder(newPath);
  }
  async HandleCopy(singleFileName: string, newPath: string): Promise<void> {
    this.clientFilesystem.OnCopy(singleFileName, newPath);
    await this.serverFilesystem.Copy(singleFileName, newPath);
  }
  async HandleMove(item: string, newPath: string): Promise<void> {
    this.clientFilesystem.OnMove(item, newPath);
    await this.serverFilesystem.Move(item, newPath);
  }
  async HandleRename(item: string, newItemPath: string): Promise<void> {
    this.clientFilesystem.OnRename(item, newItemPath);
    await this.serverFilesystem.Rename(item, newItemPath);
  }
  async HandleEdit(item: string, content: string): Promise<void> {
    this.clientFilesystem.OnRename(item, content);
    await this.serverFilesystem.Rename(item, content);
  }
  async HandleGetcontent(item: string): Promise<string> {
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
    this.clientFilesystem.OnSetPermissions(item, perms, permsCode, recursive);
    await this.serverFilesystem.SetPermissions(
      item,
      perms,
      permsCode,
      recursive
    );
  }
  async HandleMoveMultiple(items: string[], newPath: string): Promise<void> {
    this.clientFilesystem.OnMoveMultiple(items, newPath);
    await this.serverFilesystem.MoveMultiple(items, newPath);
  }
  async HandleCopyMultiple(items: string[], newPath: string): Promise<void> {
    this.clientFilesystem.OnCopyMultiple(items, newPath);
    await this.serverFilesystem.CopyMultiple(items, newPath);
  }
  async HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void> {
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
    this.clientFilesystem.OnRemove(items);
    await this.serverFilesystem.Remove(items);
  }

  async HandleNavigateUp(): Promise<void> {
    const currentPath = await this.$CurrentPath.pipe(take(1)).toPromise();
    const currentPathParsed = !!currentPath ? currentPath : '';
    const slashSegments = currentPathParsed.split('/');
    slashSegments.pop();
    const parentPath = slashSegments.join('/');
    const currentFiles = await this.clientFilesystem.$currentFiles
      .pipe(take(1))
      .toPromise();
    await this.HandleList(parentPath);
    this.selectFirstFrom(currentFiles);
  }

  async onSelectItem(file: core.ResFile) {
    this.clientFilesystem.onSelectItem(file);
  }

  selectFirstFrom(items) {
    const firstSelected = [...items].shift();
    this.$SelectedFile.next(firstSelected);
  }
}
