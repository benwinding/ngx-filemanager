import { Bucket } from '../../types/google-cloud-types';
import { EnsureGoogleStoragePathDir } from '../../utils/path-helpers';
import { UserCustomClaims } from 'ngx-filemanager-core';

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: UserCustomClaims
) {
  const directoryPath = EnsureGoogleStoragePathDir(newDirectoryPath);
  const file = bucket.file(directoryPath);
  const result = { success: true };
  try {
    await file.save('');
  } catch (error) {
    result.success = false;
  }
  return result;
}
