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
  const childrenMatching = await storage.GetAllChildrenWithPrefix(
    bucket,
    inputDir.name
  );
  if (!childrenMatching || !childrenMatching.length) {
    return inputDir;
  }
  const matchingNames = childrenMatching.map(f => paths.GetParentDir(f.name)).sort();
  const lastMatch = matchingNames.pop();
  const nextPath = paths.Add2ToPathDir(lastMatch);
  const nextFreeFile = bucket.file(nextPath);
  return nextFreeFile;
}

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims,
  disableNoClobber?: boolean
) {
  try {
    const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    const newDir = bucket.file(newDirPath);
    let newDirToAdd: File;
    if (!disableNoClobber) {
      newDirToAdd = await GetNextFreeFoldernameRecursively(bucket, newDir);
    } else {
      newDirToAdd = newDir;
    }
    await storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims);
    return CreateFolderWithoutPermissions(bucket, newDirToAdd.name);
  } catch (error) {
    throw new Error(error);
  }
}
