import * as core from 'ngx-filemanager-core';

export class ClientCache {
  private cachedFolders: {
    [folderPath: string]: core.ResFile[];
  } = {};
  private cacheLimit = 20;
  public IsCached(folderPath: string) {
    return !!this.cachedFolders[folderPath];
  }
  public GetCached(folderPath: string) {
    return this.cachedFolders[folderPath];
  }
  public SetCached(folderPath: string, newFolderFiles: core.ResFile[]) {
    const oldFolders = this.cachedFolders[folderPath] || [];
    console.log('client-cache: SetCached()', {
      from: oldFolders.length,
      to: newFolderFiles.length
    });
    if (this.cachedCount > this.cacheLimit) {
      this.removeRandomFolderPath();
    }
    this.cachedFolders[folderPath] = newFolderFiles;
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
