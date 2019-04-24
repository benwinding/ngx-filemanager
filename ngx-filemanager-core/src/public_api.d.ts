export * from './lib/ngx-filemanager-core.module';
export declare type FileManagerAction = 'list' | 'rename' | 'move' | 'copy' | 'remove' | 'edit' | 'getContent' | 'getMeta' | 'createFolder' | 'changePermissions' | 'compress' | 'extract' | 'downloadMultiple';
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
export interface ReqBodyList extends ReqBodyAction {
    path: string;
}
export interface ResFile {
    name: string;
    fullPath: string;
    rightsFirebase: {}[];
    permissions: PermissionsObject;
    perms?: string;
    size: string;
    date: string;
    type: 'dir' | 'file';
    isPhantomFolder?: boolean;
    metaData?: any;
}
export interface ResBodyList {
    result: ResFile[];
}
export interface ReqBodyRename extends ReqBodyAction {
    item: string;
    newItemPath: string;
}
export interface ResBodyRename extends ResBodySuccess {
}
export interface ReqBodyMove extends ReqBodyAction {
    items: string[];
    newPath: string;
}
export interface ResBodyMove extends ResBodySuccess {
}
export interface ReqBodyCopy extends ReqBodyAction {
    items?: string[];
    singleFileName?: string;
    newPath: string;
}
export interface ResBodyCopy extends ResBodySuccess {
}
export interface ReqBodyRemove extends ReqBodyAction {
    items?: string[];
}
export interface ResBodyRemove extends ResBodySuccess {
}
export interface ReqBodyEdit extends ReqBodyAction {
    item: string;
    content: string;
}
export interface ResBodyEdit extends ResBodySuccess {
}
export interface ReqBodyGetContent extends ReqBodyAction {
    item: string;
}
export interface ResBodyGetContent {
    result: string;
}
export interface ReqBodyCreateFolder extends ReqBodyAction {
    newPath: string;
}
export interface ResBodyCreateFolder extends ResBodySuccess {
}
export interface PermissionEntity {
    name: string;
    id: string;
    type: 'group' | 'user';
}
export interface PermissionsObject {
    readers: PermissionEntity[];
    writers: PermissionEntity[];
    owners: PermissionEntity[];
}
export interface UserCustomClaims {
    groups: string[];
}
export declare type PermisionsRole = 'OWNER' | 'READER' | 'WRITER';
export interface ReqBodySetPermissions extends ReqBodyAction {
    items: string[];
    role: PermisionsRole;
    entity: PermissionEntity;
    recursive: boolean;
}
export interface ResBodySetPermissions extends ResBodySuccess {
}
export interface ResBodyUploadFile extends ResBodySuccess {
}
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
export interface FileSystemProvider {
    List(path: string): Promise<ResBodyList>;
    CreateFolder(newPath: string): Promise<ResBodyCreateFolder>;
    Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy>;
    Move(item: string, newPath: string): Promise<ResBodyMove>;
    Rename(item: string, newItemPath: string): Promise<ResBodyRename>;
    Edit(item: string, content: string): Promise<ResBodyEdit>;
    Getcontent(item: string): Promise<ResBodyGetContent>;
    SetPermissions(item: string, role: PermisionsRole, entity: PermissionEntity, recursive?: boolean): Promise<ResBodySetPermissions>;
    MoveMultiple(items: string[], newPath: string): Promise<ResBodyMove>;
    CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy>;
    SetPermissionsMultiple(items: string[], role: PermisionsRole, entity: PermissionEntity, recursive?: boolean): Promise<ResBodySetPermissions>;
    Remove(items: string[]): Promise<ResBodyRemove>;
    GetUploadApiUrl(currentPath: string): string;
    CreateDownloadLink(file: ResFile): Promise<string>;
}
