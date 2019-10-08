import { FilePermission } from './unix-conversion';
import { File } from '../types/google-cloud-types';
import { GetTokenFromRequest } from './token-helper';
import { CoreTypes } from '../types';
import { permsFactory } from './permissions.factory';
import { VError } from 'verror';
import { permHelper } from './permissions-helper';

async function RetrieveFilePermissions(
  file: File
): Promise<CoreTypes.FilePermissionsObject> {
  const fromStorage = await permHelper.GetMetaPropertyObj<
    CoreTypes.FilePermissionsObject
  >(file, 'permissions');
  const blank = permsFactory.blankPermissionsObj();
  const safePerms = {
    ...blank,
    ...(fromStorage || {})
  };
  return safePerms;
}

async function RetrieveCustomClaims(req: Request) {
  let token;
  try {
    token = await GetTokenFromRequest(req);
  } catch (error) {
    console.log('No bearer token found on request, no permissions for user');
    return permsFactory.blankUserClaim();
  }
  const claims = token as CoreTypes.UserCustomClaims;
  if (!claims.groups) {
    claims.groups = [];
  }
  return claims;
}

function TryCheckHasAnyPermissions(claims: CoreTypes.UserCustomClaims) {
  if (!claims.groups.length && !claims.userIsSudo) {
    throw new Error('No user permissions found, cannot change permissions');
  }
}

function CanRead(othersPermissions: CoreTypes.FilePermissionOthers) {
  return othersPermissions === 'read' || othersPermissions === 'read/write';
}

function CanWrite(othersPermissions: CoreTypes.FilePermissionOthers) {
  return othersPermissions === 'read/write';
}

function CanOthersDo(
  othersPermissions: CoreTypes.FilePermissionOthers,
  toCheck: 'read' | 'write'
) {
  switch (toCheck) {
    case 'read':
      return CanRead(othersPermissions);
    case 'write':
      return CanWrite(othersPermissions);
    default:
      break;
  }
}

export type FilePermission = 'write' | 'read';

function TryCheckFileAccess(
  filePermissions: CoreTypes.FilePermissionsObject,
  claims: CoreTypes.UserCustomClaims,
  toCheck: 'read' | 'write'
): boolean {
  // Anyone can do something
  const anyoneCanDo = CanOthersDo(filePermissions.others, toCheck);
  if (anyoneCanDo) {
    return true;
  }
  // Has no userclaims
  const hasClaims = !!claims;
  if (!hasClaims) {
    return false;
  }
  // Sudo can do anything
  const sudoCanDo = claims.userIsSudo;
  if (sudoCanDo) {
    return true;
  }
  const userAndGroups = [...claims.groups, claims.user_id];
  let arrayToCheck;
  if (toCheck === 'read') {
    arrayToCheck = filePermissions.readers;
  } else {
    arrayToCheck = filePermissions.writers;
  }
  if (IsPartOfArray(arrayToCheck, userAndGroups)) {
    return true;
  }
  return false;
}

function IsPartOfArray(
  arr: CoreTypes.FilePermissionEntity[],
  usersGroups: string[]
) {
  const hasNoGroupsToCheck = !usersGroups || !usersGroups.length;
  if (hasNoGroupsToCheck) {
    return false;
  }
  const userGroupSet = new Set(usersGroups);
  const isInArray = arr.find(entity => userGroupSet.has(entity));
  return !!isInArray;
}

function CheckCanEditPermissions(
  currentFilePermissions: CoreTypes.FilePermissionsObject,
  newPermissions: CoreTypes.FilePermissionsObject,
  claims: CoreTypes.UserCustomClaims
) {
  const canEditPermissions = TryCheckFileAccess(
    currentFilePermissions,
    claims,
    'write'
  );
  const canEditPermissionsAfter = TryCheckFileAccess(
    newPermissions,
    claims,
    'write'
  );
  if (!canEditPermissions) {
    throw new VError('Cannot edit permissions here');
  }
  if (!canEditPermissionsAfter) {
    throw new VError(
      'Cannot change permissions, so you wont be able to change back'
    );
  }
}

export const permsQueries = {
  RetrieveFilePermissions,
  RetrieveCustomClaims,
  TryCheckHasAnyPermissions,
  TryCheckFileAccess,
  IsPartOfArray,
  CheckCanEditPermissions
};
