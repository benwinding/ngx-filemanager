import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { Observable } from 'rxjs';

export interface ClientFileSystem {
  $currentFiles: Observable<CoreTypes.ResFile[]>;
  $currentPath: Observable<string>;
  $selectedFile: Observable<CoreTypes.ResFile>;

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
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<void>;
  // File/Directory Bulk Actions
  OnMoveMultiple(items: string[], newPath: string): Promise<void>;
  OnCopyMultiple(items: string[], newPath: string): Promise<void>;
  OnSetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<void>;
  OnRemove(items: string[]): Promise<void>;
  // Actions
  UpdateList(res: CoreTypes.ResBodyList, directoryPath: string): Promise<void>;
}
