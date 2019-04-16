import * as core from 'ngx-filemanager-core';
import { Observable } from 'rxjs';
import { PermissionEntity, PermisionsRole } from 'ngx-filemanager-core';

export interface ClientFileSystem {
  $currentFiles: Observable<core.ResFile[]>;
  $currentPath: Observable<string>;
  $selectedFile: Observable<core.ResFile>;

  // Actions
  OnList(path: string): Promise<void>;
  OnCreateFolder(newPath: string): Promise<void>;
  // File/Directory Actions
  OnCopy(singleFileName: string, newPath: string): Promise<void>;
  OnMove(item: string, newPath: string): Promise<void>;
  OnRename(item: string, newItemPath: string): Promise<void>;
  OnEdit(item: string, content: string): Promise<void>;
  OnGetcontent(item: string): Promise<void>;
  OnSetPermissions(
    item: string,
    role: PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<void>;
  // File/Directory Bulk Actions
  OnMoveMultiple(items: string[], newPath: string): Promise<void>;
  OnCopyMultiple(items: string[], newPath: string): Promise<void>;
  OnSetPermissionsMultiple(
    items: string[],
    role: PermisionsRole,
    entity: PermissionEntity,
    recursive?: boolean
  ): Promise<void>;
  OnRemove(items: string[]): Promise<void>;
  // Actions
  UpdateCurrentList(res: core.ResBodyList): Promise<void>;
}
