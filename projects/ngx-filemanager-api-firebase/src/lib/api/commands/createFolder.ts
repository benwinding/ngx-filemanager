import { Bucket, File } from '../../types/google-cloud-types';
import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
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
  inputDir: File
): Promise<File> {
  const dirNameNoSuffix = paths.GetParentDir(inputDir.name);
  const childrenMatching = await storage.GetListWithoutPermissions(
    bucket,
    dirNameNoSuffix
  );
  if (!childrenMatching || !childrenMatching.length) {
    return inputDir;
  }
  const matchingNames = childrenMatching.map(f => f.fullPath).sort();
  const lastMatch = matchingNames.shift();
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
      newDirToAdd = await GetNextFreeFoldername(bucket, newDir);
    } else {
      newDirToAdd = newDir;
    }
    await storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims);
    return CreateFolderWithoutPermissions(bucket, newDirToAdd.name);
  } catch (error) {
    throw new Error(error);
  }
}
