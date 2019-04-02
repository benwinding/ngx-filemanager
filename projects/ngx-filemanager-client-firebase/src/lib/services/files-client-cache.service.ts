import { take, map, tap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { getFileIcon, getFolderIcon } from '../utils/file-icon-guesser';
import { MakeClientDirectory } from '../utils/file.factory';

@Injectable()
export class FilesClientCacheService {
  private fileSystem: FileSystemProvider;
  public $currentFiles = new BehaviorSubject<ResFile[]>([]);
  public $currentPath = new BehaviorSubject<string>(null);
  public $selectedFile = new BehaviorSubject<ResFile>(null);

  initialize(fileSystem: FileSystemProvider) {
    this.fileSystem = fileSystem;
  }

  private async getMatches(paths: string[], notMatches?: boolean) {
    const currentFiles = await this.currentFiles();
    const matchSet = new Set(paths);
    if (notMatches) {
      return currentFiles.filter(cf => !matchSet.has(cf.fullPath));
    } else {
      return currentFiles.filter(cf => matchSet.has(cf.fullPath));
    }
  }

  public async HandleDelete(deletedPaths: string[]) {
    const filesNotDeleted = await this.getMatches(deletedPaths, true);
    this.$currentFiles.next(filesNotDeleted);
    this.selectFirstFrom(filesNotDeleted);
    await this.fileSystem.Remove(deletedPaths);
  }

  public async HandleRename(file: ResFile, renamedPath: string) {
    console.log('files-client-cache: renameAction', { file, renamedPath });
    const currentFiles = await this.currentFiles();
    const renamedFile = currentFiles.find(cf => cf.fullPath === file.fullPath);
    renamedFile.fullPath = renamedPath;
    renamedFile.name = renamedPath.split('/').pop();
    this.$currentFiles.next(currentFiles);
    this.selectFirstFrom([renamedFile]);
    await this.fileSystem.Rename(file.fullPath, renamedPath);
  }

  public async HandleNewFolder(newDirName: string) {
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
    await this.fileSystem.CreateFolder(newDirPath);
  }

  public async HandleLoadPath(path: string) {
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

  public async HandleSetPermissions(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ) {
    const filesToChange = await this.getMatches(items);
    const filesToNotChange = await this.getMatches(items, true);
    filesToChange.map(f => (f.rights = perms));
    const allFiles = [...filesToChange, ...filesToNotChange];
    this.$currentFiles.next(allFiles);
    this.selectFirstFrom(filesToChange);
    await this.fileSystem.SetPermissions(items, perms, permsCode, recursive);
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

  private selectFirstFrom(items: ResFile[]) {
    setTimeout(() => {
      const firstSelected = [...items].shift();
      this.$selectedFile.next(firstSelected);
    }, 0);
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
