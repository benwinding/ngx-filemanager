/*
 * Public API Surface of ngx-filemanager-core
 */

export * from './lib/ngx-filemanager-core.module';

// Based on the api from: https://github.com/joni2back/angular-filemanager/blob/master/API.md
// tslint:disable:no-empty-interface

export type FileManagerAction =
  | 'list'
  | 'rename'
  | 'move'
  | 'copy'
  | 'remove'
  | 'edit'
  | 'getContent'
  | 'getMeta'
  | 'createFolder'
  | 'changePermissions'
  | 'compress'
  | 'extract'
  | 'downloadMultiple';

export interface ReqBodyAction {
  action: FileManagerAction;
  bucketname: string;
}

export interface ResultObj {
  success: boolean;
  error?: string;
}

export interface ResBodySuccess {
  result: ResultObj;
}

// LIST

export interface ReqBodyList extends ReqBodyAction {
  path: string;
}

export interface ResFile {
  name: string; // filename with extension or directory name
  fullPath: string;
  rights: string; // unix string
  size: string; // bytes
  date: string; // iso format
  type: 'dir' | 'file';
  isPhantomFolder?: boolean;
}

export interface ResBodyList {
  result: ResFile[];
}

// RENAME

export interface ReqBodyRename extends ReqBodyAction {
  item: string;
  newItemPath: string;
}

export interface ResBodyRename extends ResBodySuccess {}

// MOVE

export interface ReqBodyMove extends ReqBodyAction {
  items: string[];
  newPath: string;
}

export interface ResBodyMove extends ResBodySuccess {}

// COPY

export interface ReqBodyCopy extends ReqBodyAction {
  items?: string[];
  singleFileName?: string;
  newPath: string;
}

export interface ResBodyCopy extends ResBodySuccess {}

// REMOVE

export interface ReqBodyRemove extends ReqBodyAction {
  items?: string[];
}

export interface ResBodyRemove extends ResBodySuccess {}

// EDIT

export interface ReqBodyEdit extends ReqBodyAction {
  item: string;
  content: string;
}

export interface ResBodyEdit extends ResBodySuccess {}

// GETCONTENT

export interface ReqBodyGetContent extends ReqBodyAction {
  item: string;
}

export interface ResBodyGetContent {
  result: string;
}

// CREATE FOLDER

export interface ReqBodyCreateFolder extends ReqBodyAction {
  newPath: string;
}

export interface ResBodyCreateFolder extends ResBodySuccess {}

// SET PERMISSIONS

export interface ReqBodySetPermissions extends ReqBodyAction {
  items: string[];
  perms: string;
  permsCode: string;
  recursive: boolean;
}

export interface ResBodySetPermissions extends ResBodySuccess {}

// UPLOAD FILE

export interface ResBodyUploadFile extends ResBodySuccess {}

// UPLOAD FILE

export interface ReqBodyGetMeta extends ReqBodyAction {
  item: string;
}

export interface ResBodyGetMeta extends ResBodySuccess {
  result: {
    url?: string;
    success: boolean;
    error?: string;
  };
}

// CLIENT

export interface FileSystemProvider {
  // Actions
  List(path: string): Promise<ResBodyList>;
  CreateFolder(newPath: string): Promise<ResBodyCreateFolder>;

  // File/Directory Actions

  Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy>;
  Move(item: string, newPath: string): Promise<ResBodyMove>;
  Rename(item: string, newItemPath: string): Promise<ResBodyRename>;
  Edit(item: string, content: string): Promise<ResBodyEdit>;
  Getcontent(item: string): Promise<ResBodyGetContent>;
  SetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;

  // File/Directory Bulk Actions

  MoveMultiple(items: string[], newPath: string): Promise<ResBodyMove>;
  CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy>;
  SetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;
  Remove(items: string[]): Promise<ResBodyRemove>;
  GetUploadApiUrl(currentPath: string): string;
  CreateDownloadLink(file: ResFile): Promise<string>;
}
