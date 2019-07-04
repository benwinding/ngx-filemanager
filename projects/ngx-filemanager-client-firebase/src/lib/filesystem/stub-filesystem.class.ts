import { CoreTypes, FileSystemProvider } from 'ngx-filemanager-core';
import path from 'path-browserify';
import { ConsoleLoggerService } from '../logging/console-logger.service';
import {
  EnsureTrailingSlash,
  Add2ToPathDir,
  Add2ToPath,
  EnsureNoTrailingSlash
} from '../utils/path-helpers';
import { stubFiles, MakeDir, MakeFile } from './stub-files';

export class FileSystemStub implements FileSystemProvider {
  private fakeDelayMs = 1000;
  logger = new ConsoleLoggerService();

  files: CoreTypes.ResFile[] = stubFiles;

  public setFakeDelay(newDelay: number) {
    this.fakeDelayMs = newDelay;
  }

  private async fakeDelay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, this.fakeDelayMs);
    });
  }
  private selectMatches(items: string[], isMatch: boolean) {
    const itemsSet = new Set(items);
    if (isMatch) {
      return this.files.filter(f => itemsSet.has(f.fullPath));
    } else {
      return this.files.filter(f => !itemsSet.has(f.fullPath));
    }
  }
  private isInDirectory(dirPath, filePath): boolean {
    try {
      const relative = path.relative(dirPath, filePath);
      const isSubdir =
        relative && !relative.startsWith('..') && !relative.includes('/');
      return isSubdir;
    } catch (error) {
      this.logger.warn('isInDirectory error', { dirPath, filePath, error });
      return false;
    }
  }

  async List(inputPath: string): Promise<CoreTypes.ResBodyList> {
    await this.fakeDelay();
    const folderPath = this.ensurePrefixSlash(
      this.ensureTrailingSlash(inputPath)
    );
    const matches = this.files.filter(k =>
      this.isInDirectory(folderPath, k.fullPath)
    );
    this.logger.info('List', { folderPath, files: this.files, matches });
    return {
      result: matches
    };
  }
  async Rename(
    item: string,
    newItemPath: string
  ): Promise<CoreTypes.ResBodyRename> {
    await this.fakeDelay();
    const baseName = path.basename(newItemPath);
    this.selectMatches([item], true).map(match => {
      match.name = baseName;
      match.fullPath = newItemPath;
    });
    return null;
  }
  async Move(item: string, newPath: string): Promise<CoreTypes.ResBodyMove> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(match => {
      match.fullPath = newPath;
    });
    return null;
  }
  async Copy(
    singleFileName: string,
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    await this.fakeDelay();
    this.selectMatches([singleFileName], true).map(match => {
      const copy = { ...match };
      copy.fullPath = newPath;
      this.files.push(copy);
    });
    return null;
  }
  async Edit(item: string, content: string): Promise<CoreTypes.ResBodyEdit> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(match => {
      match['content'] = content;
    });
    return null;
  }
  async Getcontent(item: string): Promise<CoreTypes.ResBodyGetContent> {
    await this.fakeDelay();
    const matches = this.selectMatches([item], true);
    return [...matches].pop()['content'];
  }
  async GetSingle(item: string): Promise<CoreTypes.ResBodyGetSingle> {
    await this.fakeDelay();
    const matches = this.selectMatches([item], true);
    const file = [...matches].pop();
    return {
      result: {
        file,
        url: file.downloadUrl,
        success: true
      }
    };
  }
  async CreateFolder(newPath: string, disableNoClobber?: boolean): Promise<CoreTypes.ResBodyCreateFolder> {
    await this.fakeDelay();
    if (disableNoClobber ) {
      const directoryPath = EnsureTrailingSlash(newPath);
      this.files.push(MakeDir(directoryPath));
    } else {
      this.recursivelyTryToCreateFolder(newPath);
    }
    return null;
  }
  private recursivelyTryToCreateFolder(newPath: string) {
    const directoryPath = EnsureTrailingSlash(newPath);
    const exists = !!this.selectMatches([directoryPath], true).length;
    if (!exists) {
      this.files.push(MakeDir(directoryPath));
      return;
    }
    const newPathWith2 = Add2ToPathDir(directoryPath);
    return this.recursivelyTryToCreateFolder(newPathWith2);
  }
  async SetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    return this.SetPermissionsMultiple([item], role, entity, recursive);
  }
  async CopyMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    await this.fakeDelay();
    this.selectMatches(items, true).map(f => {
      const copy = { ...f };
      copy.fullPath = path.join(newPath, f.name);
      this.files.push(copy);
    });
    return null;
  }
  async MoveMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyMove> {
    await this.fakeDelay();
    this.selectMatches(items, true).map(f => {
      f.fullPath = path.join(newPath, f.name);
    });
    return null;
  }
  async SetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    await this.fakeDelay();
    this.logger.info('file-system-stub: SetPermissionsMultiple', {
      items,
      files: this.files
    });
    return this.recursivelySetPermissions(items, role, entity, recursive);
  }
  async Upload(item: string): Promise<boolean> {
    await this.fakeDelay();
    this.recursivelyTryToAddFile(item);
    return null;
  }
  private recursivelyTryToAddFile(filePath: string) {
    const parsedFilePath = EnsureNoTrailingSlash(filePath);
    const exists = !!this.selectMatches([parsedFilePath], true).length;
    if (!exists) {
      this.files.push(MakeFile(parsedFilePath));
      return;
    }
    const newPathWith2 = Add2ToPath(parsedFilePath);
    return this.recursivelyTryToAddFile(newPathWith2);
  }
  recursivelySetPermissions(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ) {
    const matches = this.selectMatches(items, true);
    matches.map(item => {
      this.setSinglePermission(item, role, entity);
      const isFolder = item.type === 'dir';
      if (recursive && isFolder) {
        this.recursivelySetPermissions(
          [item.fullPath],
          role,
          entity,
          recursive
        );
      }
    });
    return null;
  }
  private setSinglePermission(
    item: CoreTypes.ResFile,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity
  ) {
    let list: string[];
    if (role === 'READER') {
      list = item.permissions.readers;
    }
    if (role === 'WRITER') {
      list = item.permissions.writers;
    }
    const inListAlready = list.includes(entity);
    if (!inListAlready) {
      list.push(entity);
    }
  }
  async SetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    await this.fakeDelay();
    const matches = this.selectMatches(items, true);
    this.logger.info('file-system-stub: SetPermissionsMultiple', {
      items,
      matches,
      permissionsObj
    });
    this.recursivelySetPermissionsObjects(items, permissionsObj, recursive);
    return null;
  }
  recursivelySetPermissionsObjects(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ) {
    const matches = this.selectMatches(items, true);
    matches.map(item => {
      item.permissions = permissionsObj;
      const isFolder = item.type === 'dir';
      if (recursive && isFolder) {
        this.recursivelySetPermissionsObjects(
          [item.fullPath],
          permissionsObj,
          recursive
        );
      }
    });
    return null;
  }

  async Remove(items: string[]): Promise<CoreTypes.ResBodyRemove> {
    await this.fakeDelay();
    const itemsSet = new Set(items);
    const itemsNotDeleted = this.files.filter(f => !itemsSet.has(f.fullPath));
    this.files = itemsNotDeleted;
    return null;
  }

  private ensureTrailingSlash(inputPath: string) {
    const hasTrailing = inputPath.slice(-1) === '/';
    if (hasTrailing) {
      return inputPath;
    }
    return inputPath + '/';
  }
  private ensurePrefixSlash(inputPath: string) {
    const hasPrefix = inputPath.slice(0, 1) === '/';
    if (hasPrefix) {
      return inputPath;
    }
    return '/' + inputPath;
  }

  GetUploadApiUrl(currentPath: string): string {
    return 'https://httpbin.org/post';
  }

  async CreateDownloadLink(file: CoreTypes.ResFile): Promise<string> {
    return 'https://upload.wikimedia.org/wikipedia/commons/8/85/Exponential_Function_%28Abs_Imag_Part_at_Infinity%29_Density.png';
  }
}
