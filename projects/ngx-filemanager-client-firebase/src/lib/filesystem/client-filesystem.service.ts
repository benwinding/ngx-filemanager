import { take, map, tap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as core from 'ngx-filemanager-core';
import { MakeClientDirectory } from '../utils/file.factory';
import { getFileIcon, getFolderIcon } from '../utils/icon-url-resolver';
import { ClientFileSystem } from './client-filesystem';
import { ClientCache } from './client-cache';

@Injectable()
export class ClientFileSystemService implements ClientFileSystem {
  private folderCache = new ClientCache();

  public $currentFiles = new BehaviorSubject<core.ResFile[]>([]);
  public $currentPath = new BehaviorSubject<string>(null);
  public $selectedFile = new BehaviorSubject<core.ResFile>(null);

  async OnList(path: string): Promise<void> {
    this.$currentPath.next(path);
    const cachedFiles = this.folderCache.GetCached(path);
    this.$currentFiles.next(cachedFiles);
  }
  async OnCreateFolder(newPath: string): Promise<void> {
    const path = await this.$currentPath.pipe(take(1)).toPromise();
    const cachedFiles = this.folderCache.GetCached(path);
    const folderName = newPath.split('/').pop();
    const newFolder = MakeClientDirectory(folderName, newPath);
    cachedFiles.unshift(newFolder);
    this.folderCache.SetCached(path, cachedFiles);
    this.$currentFiles.next(cachedFiles);
  }
  async OnCopy(singleFileName: string, newPath: string): Promise<void> {}
  async OnMove(item: string, newPath: string): Promise<void> {
    await this.removeFromList(item);
  }
  async OnRename(item: string, newItemPath: string): Promise<void> {}
  async OnEdit(item: string, content: string): Promise<void> {}
  async OnGetcontent(item: string): Promise<void> {}
  async OnSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void> {}
  async OnMoveMultiple(items: string[], newPath: string): Promise<void> {
    await Promise.all(items.map(item => this.removeFromList(item)));
  }
  async OnCopyMultiple(items: string[], newPath: string): Promise<void> {}
  async OnSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async OnRemove(items: string[]): Promise<void> {
    await Promise.all(items.map(item => this.removeFromList(item)));
  }
  async UpdateCurrentList(res: core.ResBodyList): Promise<void> {
    const path = await this.$currentPath.pipe(take(1)).toPromise();
    this.folderCache.SetCached(path, res.result);
    this.$currentFiles.next(res.result);
  }

  private async removeFromList(filePath: string) {
    const path = await this.$currentPath.pipe(take(1)).toPromise();
    const cachedFiles = this.folderCache.GetCached(path);
    const filePathSafe = filePath || '';
    const fileName = filePathSafe.split('/').pop();
    const cachedFilesWithout = cachedFiles.filter(f => f.name !== fileName);
    this.folderCache.SetCached(path, cachedFilesWithout);
    this.$currentFiles.next(cachedFilesWithout);
  }

  public get $FilesWithIcons(): Observable<core.ResFile[]> {
    return this.$currentFiles.pipe(
      map(files => (files ? files : [])),
      map(files => files.map(file => this.addIconPath(file))),
      map(files =>
        files.map(file => {
          return { ...file };
        })
      ),
      tap(filesWithIcons => {
        console.log('client-filesystem: $FilesWithIcons, tap()', {
          filesWithIcons
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

  public onSelectItem(item: core.ResFile): any {
    this.$selectedFile.next(item);
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
