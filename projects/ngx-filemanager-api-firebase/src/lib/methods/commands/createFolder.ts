import { Bucket } from '../google-cloud-types';
import { EnsureGoogleStoragePathDir } from '../path-helpers';

export async function CreateFolder(bucket: Bucket, newDirectoryPath: string) {
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
