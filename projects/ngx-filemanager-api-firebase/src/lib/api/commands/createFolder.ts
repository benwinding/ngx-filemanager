import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';

export async function CreateFolderWithoutPermissions(
  bucket: Bucket,
  newDirectoryPath: string
) {
  const directoryPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
  const file = bucket.file(directoryPath);
  const result = { success: true };
  try {
    await file.save('');
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
