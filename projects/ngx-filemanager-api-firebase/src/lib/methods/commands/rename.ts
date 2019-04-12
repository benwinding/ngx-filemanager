import { Bucket, File } from '../google-cloud-types';
import { getResult, getResultFromArray } from '../translation-helpers';
import { EnsureNoPrefixSlash } from '../path-helpers';
import * as path from 'path';
import { GetFilesOptions } from '@google-cloud/storage';

export async function getAllChildrenFromPrefix(
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

async function tryRenameFile(file: File, newPrefix: string) {
  const prefixLength = newPrefix.length;
  const originalFilePath = file.name;
  const relativePath = originalFilePath.slice(prefixLength);
  const newPath = path.join(newPrefix, relativePath);
  const pathNoPrefix = EnsureNoPrefixSlash(newPath);
  console.log(`- renaming "${originalFilePath}" -> "${pathNoPrefix}"`);
  const result = await file.move(pathNoPrefix);
  return result[0];
}

export async function RenameFile(
  bucket: Bucket,
  item: string,
  newItemPath: string
) {
  const isFile = !item.endsWith('/');
  if (isFile) {
    const file = bucket.file(item);
    const resultObj = await tryRenameFile(file, newItemPath);
    const result = getResult(resultObj);
    return result;
  }
  const itemsPrefixOld = EnsureNoPrefixSlash(item);
  const itemsPrefixNew = EnsureNoPrefixSlash(newItemPath);
  const allChildren = await getAllChildrenFromPrefix(bucket, itemsPrefixOld);
  const moveResults = await Promise.all(
    allChildren.map(f => tryRenameFile(f, itemsPrefixNew))
  );
  const results = getResultFromArray(moveResults);
  return results;
}
