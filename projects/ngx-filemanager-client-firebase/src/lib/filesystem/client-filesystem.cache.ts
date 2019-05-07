import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { ConsoleLoggerService } from '../logging/console-logger.service';
import { EnsureTrailingSlash } from '../utils/path-helpers';

export class ClientCache {
  private logger = new ConsoleLoggerService();

  private cachedFolders: {
    [folderPath: string]: CoreTypes.ResFile[];
  } = {};
  private cacheLimit = 20;

  public GetCached(input: string) {
    const directoryPath = EnsureTrailingSlash(input);
    return this.cachedFolders[directoryPath] || [];
  }
  public SetCached(input: string, newFolderFiles: CoreTypes.ResFile[]) {
    const directoryPath = EnsureTrailingSlash(input);
    const oldFolders = this.GetCached(directoryPath);
    this.logger.info('SetCached()', {
      from: oldFolders.length,
      to: newFolderFiles.length
    });
    if (this.cachedCount > this.cacheLimit) {
      this.removeRandomFolderPath();
    }
    this.cachedFolders[directoryPath] = newFolderFiles;
  }

  private get cachedCount() {
    return Object.keys(this.cachedFolders).length;
  }
  private removeRandomFolderPath() {
    const randomIndex = Math.floor(Math.random() * this.cachedCount);
    const randomKey = Object.keys(this.cachedFolders)[randomIndex];
    delete this.cachedFolders[randomKey];
  }
}
