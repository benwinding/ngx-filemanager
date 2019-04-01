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

  public $triggerSelectItem = new Subject<ResFile>();
  public $selectedFile = new BehaviorSubject<ResFile>(null);

  initialize(fileSystem: FileSystemProvider) {
    this.fileSystem = fileSystem;
  }

  public async HandleDelete(deletedPaths: string[]) {
    const currentFiles = await this.currentFiles();
    const deletedSet = new Set(deletedPaths);
    this.$currentFiles.next(
      currentFiles.filter(cf => !deletedSet.has(cf.fullPath))
    );
    await this.fileSystem.Remove(deletedPaths);
  }

  public async HandleRename(file: ResFile, renamedPath: string) {
    const currentFiles = await this.currentFiles();
    const renamedFile = currentFiles.find(cf => cf.fullPath === file.fullPath);
    renamedFile.fullPath = renamedPath;
    renamedFile.name = renamedPath.split('/').pop();
    console.log('files-page: renameAction', { renamedFile });
    this.$currentFiles.next(currentFiles);
    await this.fileSystem.Rename(file.fullPath, renamedPath);
  }

  public async HandleNewFolder(newDirName: string) {
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const newDirPath = currentPath + newDirName;
    const currentFiles = await this.currentFiles();
    const tempDir = MakeClientDirectory(newDirName, newDirPath);
    this.addIconPath(tempDir);
    const newFiles = [...currentFiles, tempDir];
    console.log('files-page: onClickNewFolder, making new folder', {
      newDirName,
      currentPath
    });
    this.$currentFiles.next(newFiles);
    await this.fileSystem.CreateFolder(newDirPath);
  }

  public async HandleLoadPath(path: string) {
    const response = await this.fileSystem.List(path);
    const newFiles = [...response.result];
    console.log('files-page: setExplorerPath', { newFiles });
    this.$currentPath.next(path);
    this.$currentFiles.next(newFiles);
    const firstFile = [...newFiles].shift();
    this.$selectedFile.next(firstFile);
    this.$triggerSelectItem.next(firstFile);
  }

  public async HandleNavigateUp() {
    const currentPath = await this.$currentPath.pipe(take(1)).toPromise();
    const slashSegments = currentPath.split('/');
    slashSegments.pop();
    const parentPath = slashSegments.join('/');
    console.log('files-page: onClickUpFolder', { currentPath, parentPath });
  }

  public get $FilesWithIcons(): Observable<ResFile[]> {
    return this.$currentFiles.pipe(
      map(files => files.map(file => this.addIconPath(file))),
      map(files =>
        files.map(file => {
          return { ...file, id: file.fullPath };
        })
      ),
      tap(files => {
        console.log('files-page: added files to filesWithIcons$', { files });
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
    this.$selectedFile.next(item);
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
