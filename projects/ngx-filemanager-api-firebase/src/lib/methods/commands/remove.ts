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

export async function RemoveFileWithChildren(bucket: Bucket, item: string) {
  const itemPath = EnsureNoPrefixSlash(item);
  let parent;
  try {
    parent = bucket.file(itemPath);
  } catch (e) {
    console.log('error getting file: ', e.message);
    return;
  }
  const children = await getAllChildren(bucket, itemPath);
  const allFiles = [...children, parent];
  return Promise.all(
    allFiles.map(f => {
      try {
        f.delete();
      } catch (e) {
        console.log('error deleting file: ', e.message);
      }
    })
  );
}

export async function RemoveFiles(bucket: Bucket, items: string[]) {
  await Promise.all(items.map(files => RemoveFileWithChildren(bucket, files)));
  const results: ResultObj = {
    success: true
  };
  return results;
}
