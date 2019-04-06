import { Bucket } from '../google-cloud-types';
import { EnsureTrailingSlash, EnsureNoPrefixSlash } from '../path-helpers';

export async function CreateFolder(bucket: Bucket, newDirectoryPath: string) {
  const newDirectoryPathNoSlash = EnsureNoPrefixSlash(newDirectoryPath);
  const directoryPath = EnsureTrailingSlash(newDirectoryPathNoSlash);
  const file = bucket.file(directoryPath);
  const result = { success: true };
  try {
    await file.save('');
  } catch (error) {
    result.success = false;
  }
  return result;
}
