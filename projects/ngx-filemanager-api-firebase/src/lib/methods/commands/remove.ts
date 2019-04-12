import { Bucket, File } from '../google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import { EnsureNoPrefixSlash } from '../path-helpers';
import { ResultObj } from '../core-types';

export async function getAllChildren(
  bucket: Bucket,
  fileOrDirectoryPath: string
): Promise<File[]> {
  const pathNoPrefix = EnsureNoPrefixSlash(fileOrDirectoryPath);
  const options: GetFilesOptions = {};
  options.prefix = pathNoPrefix;
  const result = await bucket.getFiles(options);
  const files = result[0];
  return files;
}

export async function tryDeleteFile(file: File): Promise<boolean> {
  const exists = (await file.exists()).shift();
  if (exists) {
    console.log('- deleting file: ', file.name);
    await file.delete();
    return true;
  }
  return false;
}

export async function RemoveFileWithChildren(bucket: Bucket, itemPath: string): Promise<boolean> {
  const allChildren = await getAllChildren(bucket, itemPath);
  const successArray = await Promise.all(allChildren.map(f => tryDeleteFile(f)));
  const allSuccesses = successArray.reduce((acc, cur) => acc = acc && cur, true);
  return allSuccesses;
}

export async function RemoveFiles(bucket: Bucket, items: string[]) {
  const googleStorageItemPaths = items.map(p => EnsureNoPrefixSlash(p));
  const successArray = await Promise.all(googleStorageItemPaths.map(itemPath => RemoveFileWithChildren(bucket, itemPath)));
  const allSuccesses = successArray.reduce((acc, cur) => acc = acc && cur, true);
  const results: ResultObj = {
    success: allSuccesses
  };
  return results;
}
