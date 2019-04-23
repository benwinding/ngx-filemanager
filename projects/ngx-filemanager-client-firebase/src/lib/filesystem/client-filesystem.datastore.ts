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
  public GetCached(directoryPath: string) {
    return this.cache.GetCached(directoryPath);
  }
  public SetDirectoryFiles(files: core.ResFile[], directoryPath: string) {
    this.cache.SetCached(directoryPath, files);
  }
  public SetPath(path: string) {
    this.logger.info('datastore.SetPath', {path});
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
