import { File } from '../../types/google-cloud-types';
import { Bucket } from '@google-cloud/storage';
import * as request from 'request';
import { CoreTypes } from '../../types';
import { VError } from 'verror';
import { perms } from '../../permissions';
import { storage } from '../../utils/storage-helper';

export async function TryChangeSingleFilePermissionsObject(
  file: File,
  newPermissions: CoreTypes.FilePermissionsObject,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    // Disabled for new Admin Flag in config
    // const currentFilePermissions = await perms.queries.RetrieveFilePermissions(
    //   file
    // );
    // perms.queries.CheckCanEditPermissions(
    //   currentFilePermissions,
    //   newPermissions,
    //   claims
    // );
    const res = await perms.commands.UpdateFilePermissions(
      file,
      newPermissions
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

async function tryChangePermissionsObject(
  bucket: Bucket,
  filePath: string,
  permissionsObj: CoreTypes.FilePermissionsObject,
  isRecursive: boolean,
  claims: CoreTypes.UserCustomClaims
): Promise<{}[]> {
  if (isRecursive) {
    try {
      const allChildren = await storage.GetAllChildrenWithPrefix(
        bucket,
        filePath
      );
      const successArray = await Promise.all(
        allChildren.map(file =>
          TryChangeSingleFilePermissionsObject(file, permissionsObj, claims)
        )
      );
      return successArray;
    } catch (error) {
      throw new VError(error);
    }
  } else {
    try {
      const file = bucket.file(filePath);
      const result = await TryChangeSingleFilePermissionsObject(
        file,
        permissionsObj,
        claims
      );
      return [result];
    } catch (error) {
      throw new VError(error);
    }
  }
}

export async function ChangePermissionsObject(
  bucket: Bucket,
  items: string[],
  permissionsObj: CoreTypes.FilePermissionsObject,
  isRecursive: boolean,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResultObj> {
  try {
    const successArr = await Promise.all(
      items.map(filePath =>
        tryChangePermissionsObject(
          bucket,
          filePath,
          permissionsObj,
          isRecursive,
          claims
        )
      )
    );
    return {
      success: successArr as any
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
