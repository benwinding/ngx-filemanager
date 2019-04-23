import { map, filter } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MakeClientDirectory } from '../utils/file.factory';
import { getFileIcon, getFolderIcon } from '../utils/icon-url-resolver';
import { ClientFileSystem } from './client-filesystem.interface';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemDataStore } from './client-filesystem.datastore';
import * as core from 'ngx-filemanager-core';
import * as path from 'path-browserify';
import { PermissionEntity } from 'ngx-filemanager-core';

// tslint:disable:member-ordering
@Injectable()
export class ClientFileSystemService implements ClientFileSystem, OnDestroy {
  private store = new ClientFileSystemDataStore();

  get $currentFiles() {
    return this.store.$currentFiles;
  }
  get $currentPath() {
    return this.store.$currentPath;
  }
  get $selectedFile() {
    return this.store.$selectedFile;
  }

  private static instanceCount = 0;
  private instanceCountIncr() {
    ClientFileSystemService.instanceCount++;
    this.logger.info('new instance created', { instances: this.instances });
  }
  private instanceCountDecr() {
    ClientFileSystemService.instanceCount--;
    this.logger.info('instance destroyed', { instances: this.instances });
  }
  get instances() {
    return ClientFileSystemService.instanceCount;
  }

  constructor(private logger: LoggerService) {
    this.instanceCountIncr();
  }

  ngOnDestroy() {
    this.instanceCountDecr();
  }

  async OnList(folderPath: string): Promise<void> {
    this.logger.info('client.OnList', {folderPath});
    this.store.SetPath(folderPath);
  }
  async OnCreateFolder(newPath: string): Promise<void> {
    const directoryPath = path.dirname(newPath);
    const cachedFiles = this.store.GetCached(directoryPath);
    const folderName = path.basename(newPath);
    const newFolder = MakeClientDirectory(folderName, newPath);
    cachedFiles.unshift(newFolder);
    this.store.SetDirectoryFiles(cachedFiles, directoryPath);
    this.store.SetPath(directoryPath);
  }
  async OnCopy(singleFileName: string, newPath: string): Promise<void> {}
  async OnMove(item: string, newPath: string): Promise<void> {
    return this.removeSingleFromList(item);
  }
  async OnRename(item: string, newItemPath: string): Promise<void> {}
  async OnEdit(item: string, content: string): Promise<void> {}
  async OnGetcontent(item: string): Promise<void> {}
  async OnSetPermissions(
    item: string,
    role: core.PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<void> {}
  async OnMoveMultiple(items: string[], newPath: string): Promise<void> {
    return this.removeMultiple(items);
  }
  async OnCopyMultiple(items: string[], newPath: string): Promise<void> {}
  async OnSetPermissionsMultiple(
    items: string[],
    role: core.PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<void> {}
  async OnRemove(items: string[]): Promise<void> {
    return this.removeMultiple(items);
  }
  async UpdateList(res: core.ResBodyList, directoryPath: string): Promise<void> {
    this.store.SetDirectoryFiles(res.result, directoryPath);
  }

  private async removeSingleFromList(filePath: string) {
    const directoryPath = path.dirname(filePath);
    const currentFiles = this.store.GetCached(filePath);
    const itemName = this.GetFileNameFromPath(filePath);
    const cachedFilesWithout = currentFiles.filter(f => f.name !== itemName);
    this.store.SetDirectoryFiles(cachedFilesWithout, directoryPath);
  }

  private EnsureNoTrailingSlash(inputPath: string): string {
    const hasTrailing = inputPath.slice(-1) === '/';
    const pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
    return pathParsed;
  }

  private GetFileNameFromPath(inputPath: string): string {
    const safePath = inputPath || '';
    const parsedPath = this.EnsureNoTrailingSlash(safePath);
    const basename = parsedPath.split('/').pop();
    return basename;
  }

  private async removeMultiple(filePaths: string[]) {
    const directoryPath = path.dirname(filePaths.pop());
    const removeSet = new Set(
      filePaths.map(filePath => path.basename(filePath))
    );
    const currentFiles = this.store.GetCached(directoryPath);
    const cachedFilesWithout = currentFiles.filter(f => !removeSet.has(f.name));
    this.store.SetDirectoryFiles(cachedFilesWithout, directoryPath);
  }

  public get $FilesWithIcons(): Observable<core.ResFile[]> {
    return this.$currentFiles.pipe(
      map(files => (files ? files : [])),
      map(files => files.map(file => this.addIconPath(file))),
      map(files =>
        files.map(file => {
          return { ...file };
        })
      )
    );
  }

  public get $NoParentFolder() {
    return this.$currentPath.pipe(
      filter(p => !!p),
      map(p => p.split('/').length < 2)
    );
  }

  public onSelectItem(item: core.ResFile): any {
    this.store.SelectFile(item);
  }

  public CurrentFiles() {
    return this.store.CurrentFiles();
  }

  private addIconPath(file: core.ResFile) {
    if (file.type === 'file') {
      file['icon'] = getFileIcon(file.name);
    } else {
      file['icon'] = getFolderIcon(file.name);
    }
    return file;
  }
}
