import { take, map, tap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ResFile,
  FileSystemProvider,
  ResBodyEdit,
  ResBodyRename,
  ResBodyRemove,
  ResBodyCreateFolder,
  ResBodyList,
  ResBodyCopy,
  ResBodyMove,
  ResBodyGetContent,
  ResBodySetPermissions
} from 'ngx-filemanager-core/public_api';
import { MakeClientDirectory } from '../utils/file.factory';
import { getFileIcon, getFolderIcon } from '../utils/icon-url-resolver';

export interface FilesClientCache {
  // Actions
  HandleList(path: string): Promise<ResBodyList>;
  HandleCreateFolder(newPath: string): Promise<ResBodyCreateFolder>;

  // File/Directory Actions

  HandleCopy(singleFileName: string, newPath: string): Promise<ResBodyCopy>;
  HandleMove(item: string, newPath: string): Promise<ResBodyMove>;
  HandleRename(item: string, newItemPath: string): Promise<ResBodyRename>;
  HandleEdit(item: string, content: string): Promise<ResBodyEdit>;
  HandleGetcontent(item: string): Promise<ResBodyGetContent>;
  HandleSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;

  // File/Directory Bulk Actions

  HandleMoveMultiple(items: string[], newPath: string): Promise<ResBodyMove>;
  HandleCopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy>;
  HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;
  HandleRemove(items: string[]): Promise<ResBodyRemove>;
}

@Injectable()
export class FilesClientCacheService implements FilesClientCache {
  private fileSystem: FileSystemProvider;
  public $currentFiles = new BehaviorSubject<ResFile[]>([]);
  public $currentPath = new BehaviorSubject<string>(null);
  public $selectedFile = new BehaviorSubject<ResFile>(null);

  initialize(fileSystem: FileSystemProvider) {
    this.fileSystem = fileSystem;
  }

  public async HandleList(path: string): Promise<ResBodyList> {
    const response = await this.fileSystem.List(path);
    const newFiles = [...response.result];
    console.log('files-client-cache: setExplorerPath', { path, newFiles });
    this.$currentPath.next(path);
    this.$currentFiles.next(newFiles);
    const newFilePaths = new Set(newFiles.map(f => f.fullPath));
    const currentSelection = await this.$selectedFile.pipe(take(1)).toPromise();
    console.log('files-client-cache: setExplorerPath', {
      currentSelected: currentSelection,
      newFilesSet: newFilePaths
    });
    if (!currentSelection) {
      this.selectFirstFrom(newFiles);
      return;
    }
    if (newFilePaths.has(currentSelection.fullPath)) {
      return;
    }
    this.selectFirstFrom(newFiles);
    return response;
  }
  public async HandleCreateFolder(
    newDirName: string
  ): Promise<ResBodyCreateFolder> {
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const newDirPath = currentPath + newDirName;
    const currentFiles = await this.currentFiles();
    const tempDir = MakeClientDirectory(newDirName, newDirPath);
    this.addIconPath(tempDir);
    const newFiles = [...currentFiles, tempDir];
    console.log('files-client-cache: onClickNewFolder, making new folder', {
      newDirName,
      currentPath
    });
    this.$currentFiles.next(newFiles);
    return await this.fileSystem.CreateFolder(newDirPath);
  }
  public async HandleCopy(
    singleFileName: string,
    newPath: string
  ): Promise<ResBodyCopy> {
    return null;
  }
  public async HandleMove(item: string, newPath: string): Promise<ResBodyMove> {
    return null;
  }
  public async HandleRename(
    item: string,
    newItemPath: string
  ): Promise<ResBodyRename> {
    console.log('files-client-cache: renameAction', { item, newItemPath });
    const currentFiles = await this.currentFiles();
    const renamedFile = currentFiles.find(cf => cf.fullPath === item);
    renamedFile.fullPath = newItemPath;
    renamedFile.name = newItemPath.split('/').pop();
    this.$currentFiles.next(currentFiles);
    this.selectFirstFrom([renamedFile]);
    return await this.fileSystem.Rename(item, newItemPath);
  }
  public async HandleEdit(item: string, content: string): Promise<ResBodyEdit> {
    return null;
  }
  public async HandleGetcontent(item: string): Promise<ResBodyGetContent> {
    return null;
  }
  public async HandleSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    const currentFiles = await this.currentFiles();
    const renamedFile = currentFiles.find(cf => cf.fullPath === item);
    renamedFile.rights = perms;
    this.$currentFiles.next(currentFiles);
    this.selectFirstFrom([renamedFile]);
    return await this.fileSystem.SetPermissions(
      item,
      perms,
      permsCode,
      recursive
    );
  }
  public async HandleMoveMultiple(
    items: string[],
    newFolderPath: string
  ): Promise<ResBodyMove> {
    const currentFiles = await this.currentFiles();
    const matches = await this.selectMatches(currentFiles, items, false);
    this.$currentFiles.next(matches);
    this.selectFirstFrom(matches);
    return await this.fileSystem.MoveMultiple(
      items,
      newFolderPath
    );
  }
  public async HandleCopyMultiple(
    items: string[],
    newFolderPath: string
  ): Promise<ResBodyCopy> {
    const currentFiles = await this.currentFiles();
    const matches = await this.selectMatches(currentFiles, items, false);
    this.$currentFiles.next(matches);
    this.selectFirstFrom(matches);
    return await this.fileSystem.MoveMultiple(
      items,
      newFolderPath
    );
  }
  public async HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    const currentFiles = await this.currentFiles();
    const filesChanged = await this.selectMatches(currentFiles, items, true);
    filesChanged.map(f => (f.rights = perms));
    this.$currentFiles.next(currentFiles);
    this.selectFirstFrom(filesChanged);
    return await this.fileSystem.SetPermissionsMultiple(
      items,
      perms,
      permsCode,
      recursive
    );
  }
  public async HandleRemove(items: string[]): Promise<ResBodyRemove> {
    const currentFiles = await this.currentFiles();
    const filesNotDeleted = await this.selectMatches(currentFiles, items, false);
    this.$currentFiles.next(filesNotDeleted);
    this.selectFirstFrom(filesNotDeleted);
    return await this.fileSystem.Remove(items);
  }

  public async HandleNavigateUp() {
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const slashSegments = currentPath.split('/');
    slashSegments.pop();
    const parentPath = slashSegments.join('/');
    const currentFiles = await this.currentFiles();
    this.selectFirstFrom(currentFiles);
    console.log('files-client-cache: onClickUpFolder', {
      currentPath,
      parentPath
    });
  }

  public get $FilesWithIcons(): Observable<ResFile[]> {
    return this.$currentFiles.pipe(
      map(files => files.map(file => this.addIconPath(file))),
      map(files =>
        files.map(file => {
          return { ...file };
        })
      ),
      tap(files => {
        console.log('files-client-cache: added files to filesWithIcons$', {
          files
        });
      })
    );
  }

  public get $NoParentFolder() {
    return this.$currentPath.pipe(
      filter(p => !!p),
      map(path => path.split('/').length < 2)
    );
  }

  public onSelectItem(item: ResFile): any {
    console.log('files-client-cache: onSelectItem', { item });
    this.$selectedFile.next(item);
  }

  private async selectMatches(currentFiles: ResFile[], paths: string[], doesMatch?: boolean) {
    const matchSet = new Set(paths);
    if (doesMatch) {
      return currentFiles.filter(cf => matchSet.has(cf.fullPath));
    } else {
      return currentFiles.filter(cf => !matchSet.has(cf.fullPath));
    }
  }

  private selectFirstFrom(items: ResFile[]) {
    const firstSelected = [...items].shift();
    this.$selectedFile.next(firstSelected);
  }

  private addIconPath(file: ResFile) {
    if (file.type === 'file') {
      file['icon'] = getFileIcon(file.name);
    } else {
      file['icon'] = getFolderIcon(file.name);
    }
    return file;
  }

  private async currentFiles() {
    const currentFiles = await this.$currentFiles.pipe(take(1)).toPromise();
    return currentFiles;
  }
}
