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
    rights: null,
    size: '111',
    date: new Date().toISOString(),
    type: isDir ? 'dir' : 'file'
  };
}

export class FileSystemStub implements FileSystemProvider {
  files: ResFile[] = [
    MakeFakeFile('/subfile.txt'),
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
  private getMatches(items: string[]) {
    const itemsSet = new Set(items);
    const matches = this.files
    .filter(f => itemsSet.has(f.fullPath));
    return matches;
  }

  async List(path: string): Promise<ResBodyList> {
    await this.fakeDelay();
    const matches = this.files.filter(k => k.fullPath.indexOf(path) === 0);
    return {
      result: matches
    };
  }
  async Rename(item: string, newItemPath: string): Promise<ResBodyRename> {
    await this.fakeDelay();
    const match = this.files.find(f => f.fullPath === item);
    if (!match) {
      return null;
    }
    match.name = newItemPath.split('/').pop();
    match.fullPath = newItemPath;
    return null;
  }
  async Move(items: string[], newPath: string): Promise<ResBodyMove> {
    await this.fakeDelay();
    this.getMatches(items)
      .map(f => {
        f.fullPath = newPath;
      });
    return null;
  }
  async Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy> {
    await this.fakeDelay();
    return null;
  }
  async CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy> {
    await this.fakeDelay();
    return null;
  }
  async Remove(items: string[]): Promise<ResBodyRemove> {
    await this.fakeDelay();
    const itemsSet = new Set(items);
    const itemsNotDeleted = this.files.filter(f => !itemsSet.has(f.fullPath));
    this.files = itemsNotDeleted;
    return null;
  }
  async Edit(item: string, content: string): Promise<ResBodyEdit> {
    await this.fakeDelay();
    return null;
  }
  async Getcontent(item: string): Promise<ResBodyGetContent> {
    await this.fakeDelay();
    return null;
  }
  async CreateFolder(newPath: string): Promise<ResBodyCreateFolder> {
    await this.fakeDelay();
    this.files.push(MakeFakeFile(newPath, true));
    return null;
  }
  async SetPermissions(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    this.getMatches(items)
      .map(f => {
        f.rights = perms;
      });
    return null;
  }
}
