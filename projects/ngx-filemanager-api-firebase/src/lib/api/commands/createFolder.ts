import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
import { perms } from '../../permissions';

export async function CreateFolderWithoutPermissions(
  bucket: Bucket,
  newDirectoryPath: string
) {
  const directoryPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
  const file = bucket.file(directoryPath);
  const result = { success: true };
  try {
    await file.save('');
    const blankPerms = perms.factory.blankPermissionsObj();
    await perms.commands.UpdateFilePermissions(file, blankPerms);
  } catch (error) {
    result.success = false;
  }
  return result;
}

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    await storage.TryCheckWritePermission(bucket, newDirPath, claims);
    return CreateFolderWithoutPermissions(bucket, newDirPath);
  } catch (error) {
    throw new Error(error);
  }
}
