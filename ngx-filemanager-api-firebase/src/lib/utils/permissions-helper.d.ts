import { File } from '../types/google-cloud-types';
import { PermissionsObject, UserCustomClaims, PermissionEntity } from 'ngx-filemanager-core/public_api';
import { UserAccessResult } from '../types/UserAccessResult';
export declare function blankPermissionsObj(): PermissionsObject;
export declare function RetrieveFilePermissions(file: File): Promise<PermissionsObject>;
export declare function UpdateFilePermissions(file: File, newPermissions: PermissionsObject): Promise<any>;
export declare function RetrieveCustomClaims(req: Request): Promise<UserCustomClaims>;
export declare function GetPermissionForFile(filePermissions: PermissionsObject, userPermissions: UserCustomClaims): UserAccessResult;
export declare function IsPartOfArray(arr: PermissionEntity[], userGroupSet: Set<string>): boolean;
