import { File } from '../../types/google-cloud-types';
import { ResultObj, api } from '../../types/core-types';
import { Bucket } from '@google-cloud/storage';
import * as request from 'request';
import { GetAllChildrenWithPrefix, GetMetaProperty, SetMetaProperty } from '../../utils/storage-helper';
import { PermissionsObject } from 'ngx-filemanager-core/public_api';

export function blankPermisssionsObj(): PermissionsObject {
  return {
    owners: [],
    writers: [],
    readers: []
  };
}

export function SetPermissionToObj(
  permissionsObj: api.PermissionsObject,
  role: api.PermisionsRole,
  entity: api.PermissionEntity
): api.PermissionsObject {
  const newPermissions = {
    ...blankPermisssionsObj(),
    ...permissionsObj
  };
  let list: api.PermissionEntity[];
  switch (role) {
    case 'OWNER':
      list = newPermissions.owners;
      break;
    case 'WRITER':
      list = newPermissions.writers;
      break;
    case 'READER':
      list = newPermissions.readers;
      break;
    default:
      break;
  }
  const match = list.find(u => u.id === entity.id);
  if (!match) {
    list.push(entity);
  }
  return newPermissions;
}

export async function TryChangeSingleFilePermissions(
  file: File,
  role: api.PermisionsRole,
  entity: api.PermissionEntity
) {
  const currentPermissions = await GetMetaProperty(file, 'permissions');
  const newPermissions = SetPermissionToObj(currentPermissions, role, entity);
  const res = await SetMetaProperty(file, 'permissions', newPermissions);
  return res;
}

async function tryChangePermissions(
  bucket: Bucket,
  filePath: string,
  role: api.PermisionsRole,
  entity: api.PermissionEntity,
  isRecursive: boolean
): Promise<request.Response[]> {
  if (isRecursive) {
    const allChildren = await GetAllChildrenWithPrefix(bucket, filePath);
    const successArray = await Promise.all(
      allChildren.map(file =>
        TryChangeSingleFilePermissions(file, role, entity)
      )
    );
    return successArray;
  } else {
    const file = bucket.file(filePath);
    const result = await TryChangeSingleFilePermissions(file, role, entity);
    return [result];
  }
}

export async function ChangePermissions(
  bucket: Bucket,
  items: string[],
  role: api.PermisionsRole,
  entity: api.PermissionEntity,
  isRecursive: boolean
): Promise<ResultObj> {
  const successArr = await Promise.all(
    items.map(filePath =>
      tryChangePermissions(bucket, filePath, role, entity, isRecursive)
    )
  );

  // const successArr = successArrArr.reduce((acc, cur) => {
  //   return acc.concat(cur);
  // }, []);
  // const results = getResultFromArray(successArr);
  // return results;
  return {
    success: true
  };
}
