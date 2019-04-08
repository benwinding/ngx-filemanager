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

function MakeFakeFile(path: string, isDir?: boolean): ResFile {
  return {
    name: path.split('/').pop(),
    fullPath: path,
    rights: 'zzrwrws',
    size: '111',
    date: new Date().toISOString(),
    type: isDir ? 'dir' : 'file'
  };
}

export class FileSystemStub implements FileSystemProvider {
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
    MakeFakeFile('/subfolder/fake2.file')
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
  async List(inputPath: string): Promise<ResBodyList> {
    await this.fakeDelay();
    const hasTrailing = inputPath.slice(-1) === '/';
    const path = hasTrailing ? inputPath : inputPath + '/';
    const matches = this.files.filter(k => k.fullPath.indexOf(path) === 0);
    console.log('file-system-stub: List', { path, files: this.files, matches });
    return {
      result: matches
    };
  }
  async Rename(item: string, newItemPath: string): Promise<ResBodyRename> {
    await this.fakeDelay();
    this.selectMatches([item], true).map(match => {
      match.name = newItemPath.split('/').pop();
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
      const slashes = copy.fullPath.split('/');
      const fileName = slashes.pop();
      copy.fullPath = newPath + '/' + fileName;
      this.files.push(copy);
    });
    return null;
  }
  async MoveMultiple(items: string[], newPath: string): Promise<ResBodyMove> {
    await this.fakeDelay();
    this.selectMatches(items, true).map(f => {
      const slashes = f.fullPath.split('/');
      const fileName = slashes.pop();
      f.fullPath = newPath + '/' + fileName;
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
    console.log('file-system-stub: SetPermissionsMultiple', { items, files: this.files });
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

  GetUploadApiUrl(currentPath: string): string {
    return 'https://httpbin.org/post';
  }
}
