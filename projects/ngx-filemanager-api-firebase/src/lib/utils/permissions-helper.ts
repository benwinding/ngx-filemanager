import { GetTokenFromRequest } from './token-helper';
import { File } from '../types/google-cloud-types';
import {
  PermissionsObject,
  UserCustomClaims,
  PermissionEntity
} from 'ngx-filemanager-core/public_api';
import { GetMetaProperty, SetMetaProperty } from './storage-helper';
import { UserAccessResult } from '../types/UserAccessResult';

export function blankPermissionsObj(): PermissionsObject {
  return {
    owners: [],
    writers: [],
    readers: []
  };
}

export async function RetrieveFilePermissions(file: File): Promise<PermissionsObject> {
  return GetMetaProperty(file, 'permissions');
}

export async function UpdateFilePermissions(
  file: File,
  newPermissions: PermissionsObject
) {
  return SetMetaProperty(file, 'permissions', newPermissions);
}

function blankUserClaim(): UserCustomClaims {
  return {
    groups: []
  };
}

export async function RetrieveCustomClaims(req: Request) {
  let token;
  try {
    token = await GetTokenFromRequest(req);
  } catch (error) {
    console.warn('No token found on request, no permissions for user', {error});
    return blankUserClaim();
  }
  const claims = token as UserCustomClaims;
  if (!claims.groups) {
    claims.groups = [];
  }
  return claims;
}

/*
  Number	Octal Permission Representation	Ref
  0	 ---  No permission
  1	 --x  Execute permission
  2	 -w-  Write permission
  3	 -wx  Execute and write permission: 1 (execute) + 2 (write) = 3
  4	 r--  Read permission
  5	 r-x  Read and execute permission: 4 (read) + 1 (execute) = 5
  6	 rw-  Read and write permission: 4 (read) + 2 (write) = 6
  7	 rwx  All permissions: 4 (read) + 2 (write) + 1 (execute) = 7
*/

export function GetPermissionForFile(
  filePermissions: PermissionsObject,
  userPermissions: UserCustomClaims
): UserAccessResult {
  const groups = new Set(userPermissions.groups);
  const safePermissions = filePermissions || blankPermissionsObj();
  const isReader = IsPartOfArray(safePermissions.readers, groups);
  const isWriter = IsPartOfArray(safePermissions.writers, groups);
  const isOwner = IsPartOfArray(safePermissions.owners, groups);

  let currentPerms: UserAccessResult = 0;
  if (isReader) {
    currentPerms += 4; // 4 (read)
  }
  if (isWriter) {
    currentPerms += 2; // 2 (write)
  }
  if (isOwner) {
    currentPerms += 1; // 1 (execute)
  }
  return currentPerms;
}

export function IsPartOfArray(
  arr: PermissionEntity[],
  userGroupSet: Set<string>
) {
  const hasNoPermissionsAtAll = !arr || !arr.length;
  if (hasNoPermissionsAtAll) {
    return true;
  }
  const isInArray = arr.find(entity => userGroupSet.has(entity.id));
  return !!isInArray;
}