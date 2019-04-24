import { File } from '../../types/google-cloud-types';
import { Bucket } from '@google-cloud/storage';
import { PermissionsObject, PermisionsRole, PermissionEntity, UserCustomClaims, ResultObj } from 'ngx-filemanager-core/public_api';
export declare function SetPermissionToObj(permissionsObj: PermissionsObject, role: PermisionsRole, entity: PermissionEntity): PermissionsObject;
export declare function TryChangeSingleFilePermissions(file: File, role: PermisionsRole, entity: PermissionEntity): Promise<any>;
export declare function ChangePermissions(bucket: Bucket, items: string[], role: PermisionsRole, entity: PermissionEntity, isRecursive: boolean, claims: UserCustomClaims): Promise<ResultObj>;
