import { CoreTypes, FileSystemProvider } from 'ngx-filemanager-core';
import * as path from 'path-browserify';
import { ConsoleLoggerService } from './logger';

function MakeItem(filePath: string): CoreTypes.ResFile {
  const isDir = filePath.endsWith('/');
  return {
    name: isDir ? path.basename(filePath) : filePath,
    fullPath: filePath,
    rightsFirebase: [],
    permissions: {} as any,
    size: '111',
    date: new Date().toISOString(),
    type: isDir ? 'dir' : 'file'
  };
}

export class FileSystemStub implements FileSystemProvider {
  logger = new ConsoleLoggerService();

  files: CoreTypes.ResFile[] = [
    MakeItem('/image1.png'),
    MakeItem('/image2.jpeg'),
    MakeItem('/subfile.txt'),
    MakeItem('/subfile.mp3'),
    MakeItem('/subfile.mp4'),
    MakeItem('/tables.csv'),
    MakeItem('/time.docx'),
    MakeItem('/emptyFolder/'),
    MakeItem('/subfolder/'),
    MakeItem('/subfolder/file.txt'),

    MakeItem('/subfolder/sub1/'),
    MakeItem('/subfolder/sub1/file.txt'),
    MakeItem('/subfolder/sub1/sub1/'),
    MakeItem('/subfolder/sub1/sub1/file.txt'),
    MakeItem('/subfolder/sub1/sub1/sub1/'),
    MakeItem('/subfolder/sub1/sub1/sub1/file.txt'),
    MakeItem('/subfolder/sub1/sub2/'),
    MakeItem('/subfolder/sub1/sub2/file.txt'),
    MakeItem('/subfolder/sub1/sub2/sub1/'),
    MakeItem('/subfolder/sub1/sub2/sub1/file.txt'),

    MakeItem('/subfolder/sub2/'),
    MakeItem('/subfolder/sub2/file.txt'),
    MakeItem('/subfolder/sub2/sub1/'),
    MakeItem('/subfolder/sub2/sub1/file.txt'),
    MakeItem('/subfolder/sub2/sub1/sub1/'),
    MakeItem('/subfolder/sub2/sub1/sub1/file.txt'),
    MakeItem('/subfolder/sub2/sub2/'),
    MakeItem('/subfolder/sub2/sub2/file.txt'),
    MakeItem('/subfolder/sub2/sub2/sub1/'),
    MakeItem('/subfolder/sub2/sub2/sub1/file.txt'),
  ];

  private async fakeDelay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
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
  async Rename(item: string, newItemPath: string): Promise<CoreTypes.ResBodyRename> {
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
    return matches.pop()['content'];
  }
  async CreateFolder(newPath: string): Promise<CoreTypes.ResBodyCreateFolder> {
    await this.fakeDelay();
    const parsed = newPath.endsWith('/') ? newPath : newPath + '/';
    this.files.push(MakeItem(parsed));
    return null;
  }
  async SetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(f => {
      // f.rightsFirebase = [perms];
      if (recursive) {
        // this.SetPermissions(f.fullPath, perms, permsCode, recursive);
      }
    });
    return null;
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
    this.selectMatches(items, true).map(f => {
      // f.rightsFirebase = [perms];
      // if (recursive) {
      //   this.SetPermissions(f.fullPath, perms, permsCode, recursive);
      // }
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
