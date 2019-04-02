/*
 * Public API Surface of ngx-filemanager-core
 */

export * from './lib/ngx-filemanager-core.module';

// Based on the api from: https://github.com/joni2back/angular-filemanager/blob/master/API.md
// tslint:disable:no-empty-interface

export interface ReqBodyAction {
  action: string;
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

// CLIENT

export interface FileSystemProvider {
  List(path: string): Promise<ResBodyList>;
  Rename(item: string, newItemPath: string): Promise<ResBodyRename>;
  Move(items: string[], newPath: string): Promise<ResBodyMove>;
  Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy>;
  CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy>;
  Remove(items: string[]): Promise<ResBodyRemove>;
  Edit(item: string, content: string): Promise<ResBodyEdit>;
  Getcontent(item: string): Promise<ResBodyGetContent>;
  CreateFolder(newPath: string): Promise<ResBodyCreateFolder>;
  SetPermissions(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;
}
