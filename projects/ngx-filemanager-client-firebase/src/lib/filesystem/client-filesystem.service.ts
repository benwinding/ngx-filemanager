import { map, filter } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MakeClientDirectory, MakeClientFile } from '../utils/file.factory';
import { ClientFileSystem } from './client-filesystem.interface';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemDataStore } from './client-filesystem.datastore';
import * as path from 'path-browserify';
import { IconUrlResolverService } from '../utils/icon-url-resolver.service';
import { CoreTypes } from 'ngx-filemanager-core';
import {
  Add2ToPathDir,
  EnsureTrailingSlash,
  EnsureNoTrailingSlash,
  Add2ToPath
} from '../utils/path-helpers';

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

  constructor(
    private logger: LoggerService,
    private iconResolver: IconUrlResolverService
  ) {
    this.instanceCountIncr();
  }

  ngOnDestroy() {
    this.instanceCountDecr();
  }

  async OnList(folderPath: string): Promise<void> {
    this.logger.info('client.OnList', { folderPath });
    this.store.SetPath(folderPath);
  }
  async OnCreateFolder(newPath: string): Promise<void> {
    const cwd = path.dirname(newPath);
    const cachedFiles = this.store.GetCached(cwd);
    const newDirPathNoClobber = this.getNextFreeFoldernameRecursively(
      newPath,
      cwd
    );
    const folderName = path.basename(newDirPathNoClobber);
    const newFolder = MakeClientDirectory(folderName, newDirPathNoClobber);
    cachedFiles.unshift(newFolder);
    this.store.SetDirectoryFiles(cachedFiles, cwd);
    this.store.SetPath(cwd);
  }
  async OnUploadedFiles(uploadedFiles: string[]) {
    if (!Array.isArray(uploadedFiles) || !uploadedFiles.length) {
      return;
    }
    const cwd = this.store.CurrentPath();
    uploadedFiles.map(f => this.recursivelyTryAddFile(cwd, f));
  }
  private recursivelyTryAddFile(cwd: string, newFilePath: string) {
    const filePath = EnsureNoTrailingSlash(newFilePath);
    const exists = this.store.exists(filePath, cwd);
    if (!exists) {
      const newFile = MakeClientFile(newFilePath);
      const oldFiles = this.store.GetCached(cwd);
      const newFiles = [...oldFiles, newFile];
      this.store.SetDirectoryFiles(newFiles, cwd);
      return;
    }
    const filePathWith2 = Add2ToPath(filePath);
    return this.recursivelyTryAddFile(cwd, filePathWith2);
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
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<void> {}
  async OnMoveMultiple(items: string[], newPath: string): Promise<void> {
    return this.removeMultiple(items);
  }
  async OnCopyMultiple(items: string[], newPath: string): Promise<void> {}
  async OnSetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<void> {}
  async OnSetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<void> {}
  async OnRemove(items: string[]): Promise<void> {
    return this.removeMultiple(items);
  }
  async UpdateList(
    res: CoreTypes.ResBodyList,
    directoryPath: string
  ): Promise<void> {
    this.store.SetDirectoryFiles(res.result, directoryPath);
  }

  public getNextFreeFoldernameRecursively(
    inputDir: string,
    cwd: string
  ): string {
    const folderPath = EnsureTrailingSlash(inputDir);
    const exists = this.store.exists(folderPath, cwd);
    if (!exists) {
      return inputDir;
    }
    const nextPath = Add2ToPathDir(folderPath);
    return this.getNextFreeFoldernameRecursively(nextPath, cwd);
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
    const firstPath = filePaths[0];
    if (!firstPath) {
      return;
    }
    const directoryPath = path.dirname(firstPath);
    const removeSet = new Set(
      filePaths.map(filePath => path.basename(filePath))
    );
    const currentFiles = this.store.GetCached(directoryPath);
    const cachedFilesWithout = currentFiles.filter(f => !removeSet.has(f.name));
    this.store.SetDirectoryFiles(cachedFilesWithout, directoryPath);
    this.store.SetPath(directoryPath);
  }

  public get $FilesWithIcons(): Observable<CoreTypes.ResFile[]> {
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

  public onSelectItem(item: CoreTypes.ResFile): any {
    this.store.SelectFile(item);
  }

  public CurrentFiles() {
    return this.store.CurrentFiles();
  }

  private addIconPath(file: CoreTypes.ResFile) {
    if (file.type === 'file') {
      file['icon'] = this.iconResolver.getFileIconUrl(file.name);
    } else {
      file['icon'] = this.iconResolver.getFolderIconUrl(file.name);
    }
    return file;
  }
}
