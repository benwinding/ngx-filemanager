import * as core from 'ngx-filemanager-core';
import { ClientCache } from './client-filesystem.cache';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsoleLoggerService } from '../logging/console-logger.service';

export class ClientFileSystemDataStore {
  private cache = new ClientCache();

  private _$currentFiles = new BehaviorSubject<core.ResFile[]>([]);
  private _$currentPath = new BehaviorSubject<string>(null);
  private _$selectedFile = new BehaviorSubject<core.ResFile>(null);

  private logger = new ConsoleLoggerService();

  public get $currentFiles(): Observable<core.ResFile[]> {
    return this._$currentFiles;
  }
  public get $currentPath(): Observable<string> {
    return this._$currentPath;
  }
  public get $selectedFile(): Observable<core.ResFile> {
    return this._$selectedFile;
  }

  public CurrentPath() {
    return this._$currentPath.value;
  }
  public CurrentFiles() {
    return this._$currentFiles.value;
  }
  public SetCurrentFiles(files: core.ResFile[]) {
    const currentPath = this.CurrentPath();
    this.cache.SetCached(currentPath, files);
    this._$currentFiles.next(files);
  }
  public SetPath(path: string) {
    if (!path.startsWith('/')) {
      throw new Error('No / at beginning of path!');
    }
    const cachedFiles = this.cache.GetCached(path);
    this._$currentPath.next(path);
    this._$currentFiles.next(cachedFiles);
  }
  SelectFile(item: core.ResFile) {
    this._$selectedFile.next(item);
  }
}
