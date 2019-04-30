import { File } from '../../types/google-cloud-types';
import { Bucket } from '@google-cloud/storage';
import * as request from 'request';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { VError } from 'verror';
import { perms } from '../../permissions';
import { storage } from '../../utils/storage-helper';

export function SetPermissionToObj(
  permissionsObj: CoreTypes.FilePermissionsObject,
  role: CoreTypes.PermissionsRole,
  entity: CoreTypes.FilePermissionEntity
): CoreTypes.FilePermissionsObject {
  const newPermissions = {
    ...perms.factory.blankPermissionsObj(),
    ...permissionsObj
  };
  if (role === 'READER') {
    if (!newPermissions.readers.includes(entity)) {
      newPermissions.readers.push(entity);
    }
  }
  if (role === 'WRITER') {
    if (!newPermissions.writers.includes(entity)) {
      newPermissions.writers.push(entity);
    }
  }
  return newPermissions;
}

export async function ChangeSingleFilePermissionsAsSudo(
  file: File,
  role: CoreTypes.PermissionsRole,
  entity: CoreTypes.FilePermissionEntity
) {
  try {
    const currentFilePermissions = await perms.queries.RetrieveFilePermissions(file);
    const newPermissions = SetPermissionToObj(
      currentFilePermissions,
      role,
      entity
    );
    const res = await perms.commands.UpdateFilePermissions(file, newPermissions);
    return res;
  } catch (error) {
    throw new VError(error);
  }
}

export async function TryChangeSingleFilePermissions(
  file: File,
  role: CoreTypes.PermissionsRole,
  entity: CoreTypes.FilePermissionEntity,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const currentFilePermissions = await perms.queries.RetrieveFilePermissions(file);
    const canEditPermissions = perms.queries.TryCheckFileAccess(currentFilePermissions, claims, 'write');
    if (!canEditPermissions) {
      throw new Error('Cannot edit permissions here');
    }
    const newPermissions = SetPermissionToObj(
      currentFilePermissions,
      role,
      entity
    );
    const res = await perms.commands.UpdateFilePermissions(file, newPermissions);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

async function tryChangePermissions(
  bucket: Bucket,
  filePath: string,
  role: CoreTypes.PermissionsRole,
  entity: CoreTypes.FilePermissionEntity,
  isRecursive: boolean,
  claims: CoreTypes.UserCustomClaims
): Promise<request.Response[]> {
  if (isRecursive) {
    try {
      const allChildren = await storage.GetAllChildrenWithPrefix(bucket, filePath);
      const successArray = await Promise.all(
        allChildren.map(file =>
          TryChangeSingleFilePermissions(file, role, entity, claims)
        )
      );
      return successArray;
    } catch (error) {
      throw new VError(error);
    }
  } else {
    try {
      const file = bucket.file(filePath);
      const result = await TryChangeSingleFilePermissions(
        file,
        role,
        entity,
        claims
      );
      return [result];
    } catch (error) {
      throw new VError(error);
    }
  }
}

export async function ChangePermissions(
  bucket: Bucket,
  items: string[],
  role: CoreTypes.PermissionsRole,
  entity: CoreTypes.FilePermissionEntity,
  isRecursive: boolean,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResultObj> {
  try {
    // perms.queries.TryCheckHasAnyPermissions(claims);
    const successArr = await Promise.all(
      items.map(filePath =>
        tryChangePermissions(
          bucket,
          filePath,
          role,
          entity,
          isRecursive,
          claims
        )
      )
    );
    // return results;
    return {
      success: successArr as any
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
