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
  options['includeTrailingDelimiter'] = true;
  options.prefix = pathNoPrefix;
  const result = await bucket.getFiles(options);
  const files = result[0];
  return files;
}

export async function tryDeleteFile(file: File): Promise<boolean> {
  const exists = (await file.exists()).shift();
  if (exists) {
    await file.delete();
    return true;
  }
  return false;
}

export async function RemoveFileWithChildren(bucket: Bucket, item: string): Promise<boolean> {
  const itemPath = EnsureNoPrefixSlash(item);
  const parent = bucket.file(itemPath);
  const children = await getAllChildren(bucket, itemPath);
  const allFiles = [...children, parent];
  const successArray = await Promise.all(allFiles.map(f => tryDeleteFile(f)));
  const allSuccesses = successArray.reduce((acc, cur) => acc = acc && cur, true);
  return allSuccesses;
}

export async function RemoveFiles(bucket: Bucket, items: string[]) {
  const successArray = await Promise.all(items.map(files => RemoveFileWithChildren(bucket, files)));
  const allSuccesses = successArray.reduce((acc, cur) => acc = acc && cur, true);
  const results: ResultObj = {
    success: allSuccesses
  };
  return results;
}
