import { Bucket, File } from '../google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import { EnsureNoPrefixSlash, EnsureTrailingSlash } from '../path-helpers';
import { ResultObj } from '../core-types';

export async function getAllChildren(
  bucket: Bucket,
  fileOrDirectoryPath: string
): Promise<File[]> {
  const pathNoPrefix = EnsureNoPrefixSlash(fileOrDirectoryPath);
  const pathParsed = EnsureTrailingSlash(pathNoPrefix);
  const options: GetFilesOptions = {
    prefix: pathParsed,
    includeTrailingDelimiter: true
  } as any;
  const result = await bucket.getFiles(options);
  const files = result[0];
  return files;
}

export async function deleteAllFiles(bucket: Bucket, files: File[]) {
  return Promise.all(files.map(c => bucket.file(c.name).delete()));
}

export async function RemoveFiles(bucket: Bucket, items: string[]) {
  const fileCollectionsToRemove = await Promise.all(
    items.map(itemPath => getAllChildren(bucket, itemPath))
  );
  await Promise.all(
    fileCollectionsToRemove.map(files => deleteAllFiles(bucket, files))
  );
  const results: ResultObj = {
    success: true
  };
  return results;
}
