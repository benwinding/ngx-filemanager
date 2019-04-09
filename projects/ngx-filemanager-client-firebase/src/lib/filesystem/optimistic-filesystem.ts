export interface OptimisticFilesystem {
  // Actions
  HandleList(path: string): Promise<void>;
  HandleCreateFolder(newPath: string): Promise<void>;
  // File/Directory Actions
  HandleCopy(singleFileName: string, newPath: string): Promise<void>;
  HandleMove(item: string, newPath: string): Promise<void>;
  HandleRename(item: string, newItemPath: string): Promise<void>;
  HandleEdit(item: string, content: string): Promise<void>;
  HandleGetcontent(item: string): Promise<string>;
  HandleSetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void>;
  // File/Directory Bulk Actions
  HandleMoveMultiple(items: string[], newPath: string): Promise<void>;
  HandleCopyMultiple(items: string[], newPath: string): Promise<void>;
  HandleSetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<void>;
  HandleRemove(items: string[]): Promise<void>;
}
