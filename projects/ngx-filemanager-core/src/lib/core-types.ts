export namespace CoreTypes {
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
    rightsFirebase: {}[]; // unix string
    permissions: FilePermissionsObject; // unix string
    perms?: string;
    size: string; // bytes
    date: string; // iso format
    type: 'dir' | 'file';
    isPhantomFolder?: boolean;
    metaData?: any;
  }

  export interface ResBodyList {
    result: ResFile[];
  }

  // RENAME

  export interface ReqBodyRename extends ReqBodyAction {
    item: string;
    newItemPath: string;
  }

  // tslint:disable:no-empty-interface
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
    role: PermissionsRole;
    entity: FilePermissionEntity;
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

  // MISC

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

  export type UserId = string;
  export type GroupId = string;
  export type FilePermissionEntity = UserId | GroupId;
  export type FilePermissionOthers = 'read' | 'read/write' | 'hidden';

  export interface FilePermissionsObject {
    readers: FilePermissionEntity[];
    writers: FilePermissionEntity[];
    others: FilePermissionOthers;
  }

  export interface FirebaseToken {
    iss?: string;
    aud?: string;
    auth_time?: number; // 1554958496,
    user_id?: string; // 'NNISABcisBAHCIJasbchjashcbaSCJK',
    sub?: string; // (subject) 'NNISABcisBAHCIJasbchjashcbaSCJK',
    iat?: number;
    exp?: number;
    email?: string;
    email_verified?: boolean;
    firebase?: { identities: [{}]; sign_in_provider: string };
  }

  export interface UserCustomClaims extends FirebaseToken {
    groups: string[];
    userIsSudo?: boolean;
  }

  export type PermissionsRole = 'OWNER' | 'READER' | 'WRITER';
}
