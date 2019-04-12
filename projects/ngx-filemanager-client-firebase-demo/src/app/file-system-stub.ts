import {
  FileSystemProvider,
  ResBodyList,
  ResBodyRename,
  ResBodyMove,
  ResBodyCopy,
  ResBodyRemove,
  ResBodyEdit,
  ResBodyGetContent,
  ResBodyCreateFolder,
  ResFile,
  ResBodySetPermissions
} from 'ngx-filemanager-core/public_api';
import * as path from 'path-browserify';
import { ConsoleLoggerService } from './logger';

function MakeFakeFile(filePath: string, isDir?: boolean): ResFile {
  return {
    name: path.basename(filePath),
    fullPath: filePath,
    rights: 'zzrwrws',
    size: '111',
    date: new Date().toISOString(),
    type: isDir ? 'dir' : 'file'
  };
}

export class FileSystemStub implements FileSystemProvider {
  logger = new ConsoleLoggerService();

  files: ResFile[] = [
    MakeFakeFile('/image1.png'),
    MakeFakeFile('/image2.jpeg'),
    MakeFakeFile('/subfile.txt'),
    MakeFakeFile('/subfile.mp3'),
    MakeFakeFile('/subfile.mp4'),
    MakeFakeFile('/tables.csv'),
    MakeFakeFile('/time.docx'),
    MakeFakeFile('/emptyFolder', true),
    MakeFakeFile('/subfolder', true),
    MakeFakeFile('/subfolder/fake.file'),
    MakeFakeFile('/subfolder/fake2.file'),
    MakeFakeFile('/subfolder/sub2/', true),
    MakeFakeFile('/subfolder/sub2/fa_ke.file'),
    MakeFakeFile('/subfolder/sub2/fa_ke2.file')
  ];

  private async fakeDelay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 800);
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
      const isSubdir = relative && !relative.startsWith('..') && !relative.includes('/');
      return isSubdir;
    } catch (error) {
      this.logger.warn('isInDirectory error', {dirPath, filePath, error});
      return false;
    }
  }

  async List(inputPath: string): Promise<ResBodyList> {
    await this.fakeDelay();
    const folderPath = this.ensurePrefixSlash(this.ensureTrailingSlash(inputPath));
    const matches = this.files.filter(k => this.isInDirectory(folderPath, k.fullPath));
    this.logger.info('List', { folderPath, files: this.files, matches });
    return {
      result: matches
    };
  }
  async Rename(item: string, newItemPath: string): Promise<ResBodyRename> {
    await this.fakeDelay();
    const baseName = path.basename(newItemPath);
    this.selectMatches([item], true).map(match => {
      match.name = baseName;
      match.fullPath = newItemPath;
    });
    return null;
  }
  async Move(item: string, newPath: string): Promise<ResBodyMove> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(match => {
      match.fullPath = newPath;
    });
    return null;
  }
  async Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy> {
    await this.fakeDelay();
    this.selectMatches([singleFileName], true).map(match => {
      const copy = { ...match };
      copy.fullPath = newPath;
      this.files.push(copy);
    });
    return null;
  }
  async Edit(item: string, content: string): Promise<ResBodyEdit> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(match => {
      match['content'] = content;
    });
    return null;
  }
  async Getcontent(item: string): Promise<ResBodyGetContent> {
    await this.fakeDelay();
    const matches = this.selectMatches([item], true);
    return matches.pop()['content'];
  }
  async CreateFolder(newPath: string): Promise<ResBodyCreateFolder> {
    await this.fakeDelay();
    this.files.push(MakeFakeFile(newPath, true));
    return null;
  }
  async SetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(f => {
      f.rights = perms;
      if (recursive) {
        this.SetPermissions(f.fullPath, perms, permsCode, recursive);
      }
    });
    return null;
  }
  async CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy> {
    await this.fakeDelay();
    this.selectMatches(items, true).map(f => {
      const copy = { ...f };
      copy.fullPath = path.join(newPath, f.name);
      this.files.push(copy);
    });
    return null;
  }
  async MoveMultiple(items: string[], newPath: string): Promise<ResBodyMove> {
    await this.fakeDelay();
    this.selectMatches(items, true).map(f => {
      f.fullPath = path.join(newPath, f.name);
    });
    return null;
  }
  async SetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    await this.fakeDelay();
    this.logger.info('file-system-stub: SetPermissionsMultiple', { items, files: this.files });
    this.selectMatches(items, true).map(f => {
      f.rights = perms;
      if (recursive) {
        this.SetPermissions(f.fullPath, perms, permsCode, recursive);
      }
    });
    return null;
  }

  async Remove(items: string[]): Promise<ResBodyRemove> {
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

  async CreateDownloadLink(file: ResFile): Promise<string> {
    return 'https://upload.wikimedia.org/wikipedia/commons/8/85/Exponential_Function_%28Abs_Imag_Part_at_Infinity%29_Density.png';
  }
}
