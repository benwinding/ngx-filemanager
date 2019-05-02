import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { ClientCache } from './client-filesystem.cache';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsoleLoggerService } from '../logging/console-logger.service';
import { EnsureTrailingSlash } from '../utils/path-helpers';

export class ClientFileSystemDataStore {
  private cache = new ClientCache();

  private _$currentFiles = new BehaviorSubject<CoreTypes.ResFile[]>([]);
  private _$currentPath = new BehaviorSubject<string>(null);
  private _$selectedFile = new BehaviorSubject<CoreTypes.ResFile>(null);

  private logger = new ConsoleLoggerService();

  public get $currentFiles(): Observable<CoreTypes.ResFile[]> {
    return this._$currentFiles;
  }
  public get $currentPath(): Observable<string> {
    return this._$currentPath;
  }
  public get $selectedFile(): Observable<CoreTypes.ResFile> {
    return this._$selectedFile;
  }

  public CurrentPath() {
    return this._$currentPath.value;
  }
  public CurrentFiles() {
    return this._$currentFiles.value;
  }
  public GetCached(input: string) {
    const directoryPath = EnsureTrailingSlash(input);
    return this.cache.GetCached(directoryPath);
  }
  public SetDirectoryFiles(files: CoreTypes.ResFile[], directoryPath: string) {
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
  SelectFile(item: CoreTypes.ResFile) {
    this._$selectedFile.next(item);
  }
}
