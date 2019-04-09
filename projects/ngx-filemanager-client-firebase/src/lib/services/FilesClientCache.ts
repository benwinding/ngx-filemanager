import {
  ResBodyEdit,
  ResBodyRename,
  ResBodyRemove,
  ResBodyCreateFolder,
  ResBodyList,
  ResBodyCopy,
  ResBodyMove,
  ResBodyGetContent,
  ResBodySetPermissions
} from 'ngx-filemanager-core/public_api';

export interface FilesClientCache {
  // Actions
  HandleList(path: string): Promise<ResBodyList>;
  HandleCreateFolder(newPath: string): Promise<ResBodyCreateFolder>;
  // File/Directory Actions
  HandleCopy(singleFileName: string, newPath: string): Promise<ResBodyCopy>;
  HandleMove(item: string, newPath: string): Promise<ResBodyMove>;
  HandleRename(item: string, newItemPath: string): Promise<ResBodyRename>;
  HandleEdit(item: string, content: string): Promise<ResBodyEdit>;
  HandleGetcontent(item: string): Promise<ResBodyGetContent>;
  HandleSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;
  // File/Directory Bulk Actions
  HandleMoveMultiple(items: string[], newPath: string): Promise<ResBodyMove>;
  HandleCopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy>;
  HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions>;
  HandleRemove(items: string[]): Promise<ResBodyRemove>;
}
