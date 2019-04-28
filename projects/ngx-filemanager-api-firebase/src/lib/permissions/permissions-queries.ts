import { FilePermission, CheckUnixOctal } from './unix-conversion';
import { File } from '../types/google-cloud-types';
import { GetTokenFromRequest } from './token-helper';
import { CoreTypes } from 'ngx-filemanager-core';
import { permsFactory } from './permissions.factory';
import { storage } from '../utils/storage-helper';

async function RetrieveFilePermissions(
  file: File
): Promise<CoreTypes.PermissionsObject> {
  const fromStorage = await storage.GetMetaProperty(file, 'permissions');
  if (!fromStorage) {
    return permsFactory.blankPermissionsObj();
  }
  return fromStorage;
}

async function RetrieveCustomClaims(req: Request) {
  let token;
  try {
    token = await GetTokenFromRequest(req);
  } catch (error) {
    console.warn('No token found on request, no permissions for user', {
      error
    });
    return permsFactory.blankUserClaim();
  }
  const claims = token as CoreTypes.UserCustomClaims;
  if (!claims.groups) {
    claims.groups = [];
  }
  return claims;
}

function TryCheckHasAnyPermissions(claims: CoreTypes.UserCustomClaims) {
  if (!claims.groups.length || !claims.userIsSudo) {
    throw new Error('No user permissions found, cannot change permissions');
  }
}

function TryCheckFileAccess(
  filePermissions: CoreTypes.PermissionsObject,
  claims: CoreTypes.UserCustomClaims,
  toCheck: FilePermission
): boolean {
  const sudoCanDo = claims.userIsSudo;
  if (sudoCanDo) {
    return true;
  }
  const unixOctalGroup = filePermissions.unix;
  const [octalUser, octalGroup, octalOther] = Array.from(unixOctalGroup);
  const anyoneCanDo = CheckUnixOctal(octalOther, toCheck);
  if (anyoneCanDo) {
    return true;
  }
  const groupCanDo = CheckUnixOctal(octalGroup, toCheck);
  if (groupCanDo && IsPartOfArray(filePermissions.groups, claims.groups)) {
    return true;
  }
  const userCanDo = CheckUnixOctal(octalUser, toCheck);
  if (userCanDo && IsPartOfArray(filePermissions.users, [claims.user_id])) {
    return true;
  }
  return false;
}

function IsPartOfArray(arr: CoreTypes.PermissionEntity[], userGroups: string[]) {
  const hasNoGroupsToCheck = !userGroups || !userGroups.length;
  if (hasNoGroupsToCheck) {
    return false;
  }
  const userGroupSet = new Set(userGroups);
  const isInArray = arr.find(entity => userGroupSet.has(entity.id));
  return !!isInArray;
}

export const permsQueries = {
  RetrieveFilePermissions,
  RetrieveCustomClaims,
  TryCheckHasAnyPermissions,
  TryCheckFileAccess,
  IsPartOfArray,
};
