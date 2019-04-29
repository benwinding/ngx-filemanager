import { CoreTypes } from './lib/core-types';

/*
 * Public API Surface of ngx-filemanager-core
 */

// Based on the api from: https://github.com/joni2back/angular-filemanager/blob/master/API.md
// tslint:disable:no-empty-interface

export * from './lib/core-types';

// CLIENT

export interface FileSystemProvider {
  // Actions
  List(path: string): Promise<CoreTypes.ResBodyList>;
  CreateFolder(newPath: string): Promise<CoreTypes.ResBodyCreateFolder>;

  // File/Directory Actions

  Copy(singleFileName: string, newPath: string): Promise<CoreTypes.ResBodyCopy>;
  Move(item: string, newPath: string): Promise<CoreTypes.ResBodyMove>;
  Rename(item: string, newItemPath: string): Promise<CoreTypes.ResBodyRename>;
  Edit(item: string, content: string): Promise<CoreTypes.ResBodyEdit>;
  Getcontent(item: string): Promise<CoreTypes.ResBodyGetContent>;
  SetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.PermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions>;

  // File/Directory Bulk Actions

  MoveMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyMove>;
  CopyMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy>;
  SetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.PermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions>;
  Remove(items: string[]): Promise<CoreTypes.ResBodyRemove>;
  GetUploadApiUrl(currentPath: string): string;
  CreateDownloadLink(file: CoreTypes.ResFile): Promise<string>;
}
