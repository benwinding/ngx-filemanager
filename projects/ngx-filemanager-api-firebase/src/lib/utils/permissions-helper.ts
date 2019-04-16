import { GetTokenFromRequest } from './token-helper';
import { GetMetaProperty, SetMetaProperty } from './storage-helper';
import { File } from '../types/google-cloud-types';
import { api } from '../types/core-types';

export async function RetrieveFilePermissions(file: File) {
  const currentPermissions = await GetMetaProperty(file, 'permissions');
  return currentPermissions as api.PermissionsObject;
}

export async function UpdateFilePermissions(
  file: File,
  newPermissions: api.PermissionsObject
) {
  const result = await SetMetaProperty(file, 'permissions', newPermissions);
  return result;
}

export async function RetrieveCustomClaims(req: Request) {
  const token = await GetTokenFromRequest(req);
  const claims = token as api.UserCustomClaims;
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
  filePermissions: api.PermissionsObject,
  userPermissions: api.UserCustomClaims
): api.UserAccessResult {
  const groups = new Set(userPermissions.groups);

  const isReader = IsPartOfArray(filePermissions.readers, groups);
  const isWriter = IsPartOfArray(filePermissions.writers, groups);
  const isOwner = IsPartOfArray(filePermissions.owners, groups);

  let currentPerms: api.UserAccessResult = 0;
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
  arr: api.PermissionEntity[],
  userGroupSet: Set<string>
) {
  const hasNoPermissionsAtAll = !arr || arr.length;
  if (hasNoPermissionsAtAll) {
    return true;
  }
  const isInArray = arr.find(entity => userGroupSet.has(entity.id));
  return !!isInArray;
}
