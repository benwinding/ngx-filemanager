import { Bucket, File } from '../../types/google-cloud-types';
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

export async function GetNextFreeFoldernameRecursively(
  bucket: Bucket,
  inputDir: File
): Promise<File> {
  const [exists] = await inputDir.exists();
  if (!exists) {
    return inputDir;
  }
  const filePath = inputDir.name;
  const nextPath = paths.Add2ToPathDir(filePath);
  const nextFreeFile = bucket.file(nextPath);
  return GetNextFreeFoldernameRecursively(bucket, nextFreeFile);
}

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    const newDir = bucket.file(newDirPath);
    const newDirPathNoClobber = await GetNextFreeFoldernameRecursively(bucket, newDir);
    await storage.TryCheckWritePermission(bucket, newDirPathNoClobber.name, claims);
    return CreateFolderWithoutPermissions(bucket, newDirPathNoClobber.name);
  } catch (error) {
    throw new Error(error);
  }
}
