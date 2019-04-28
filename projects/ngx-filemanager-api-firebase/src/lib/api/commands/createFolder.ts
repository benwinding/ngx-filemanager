import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core';
import { paths } from '../../utils/paths';

export async function CreateFolder(
  bucket: Bucket,
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
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
