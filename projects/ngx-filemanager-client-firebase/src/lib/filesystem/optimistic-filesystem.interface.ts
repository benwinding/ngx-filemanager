import { PermissionEntity, PermisionsRole } from 'ngx-filemanager-core/public_api';

export interface OptimisticFilesystem {
  // Actions
  HandleList(path: string): Promise<any>;
  HandleCreateFolder(newPath: string): Promise<any>;
  // File/Directory Actions
  HandleCopy(singleFileName: string, newPath: string): Promise<any>;
  HandleMove(item: string, newPath: string): Promise<any>;
  HandleRename(item: string, newItemPath: string): Promise<any>;
  HandleEdit(item: string, content: string): Promise<any>;
  HandleGetcontent(item: string): Promise<string>;
  HandleSetPermissions(
    item: string,
    role: PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<any>;
  // File/Directory Bulk Actions
  HandleMoveMultiple(items: string[], newPath: string): Promise<any>;
  HandleCopyMultiple(items: string[], newPath: string): Promise<any>;
  HandleSetPermissionsMultiple(
    items: string[],
    role: PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<any>;
  HandleRemove(items: string[]): Promise<any>;
}
