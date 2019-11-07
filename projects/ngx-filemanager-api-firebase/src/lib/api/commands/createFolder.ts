import { Bucket, File } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
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

export async function GetNextFreeFoldername(
  bucket: Bucket,
  targetChildDir: File
): Promise<File> {
  const parentDirectory = paths.GetParentDir(targetChildDir.name);
  const childrenMatching = await storage.GetListWithoutPermissions(
    bucket,
    parentDirectory
  );
  const isEmptyParent = !childrenMatching || !childrenMatching.length;
  if (isEmptyParent) {
    return targetChildDir;
  }
  const childrenMatchingPaths = childrenMatching.map(f =>
    paths.EnsureGoogleStoragePathDir(f.fullPath)
  );
  const targetFolderPath = paths.EnsureGoogleStoragePathDir(targetChildDir.name);
  const folderExists = childrenMatchingPaths.some(
    path => path === targetFolderPath
  );
  if (!folderExists) {
    return targetChildDir;
  }
  const nextPath = paths.Add2ToPathDir(targetFolderPath);
  const nextFreeFile = bucket.file(nextPath);
  return nextFreeFile;
}

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims,
  disableNoClobber?: boolean,
  isAdmin?: boolean,
) {
  try {
    const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    const newDir = bucket.file(newDirPath);
    let newDirToAdd: File;
    if (!disableNoClobber) {
      newDirToAdd = await GetNextFreeFoldername(bucket, newDir);
    } else {
      newDirToAdd = newDir;
    }
    if (!isAdmin) {
      await storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims);
    }
    return CreateFolderWithoutPermissions(bucket, newDirToAdd.name);
  } catch (error) {
    throw new Error(error);
  }
}
