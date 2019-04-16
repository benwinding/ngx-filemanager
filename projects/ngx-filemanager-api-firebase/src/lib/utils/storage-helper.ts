import { Bucket, File } from '../types/google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import { EnsureNoPrefixSlash } from './path-helpers';
import { ResultObj } from '../types/core-types';
import * as path from 'path';

export async function GetAllChildrenWithPrefix(
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

export async function TryRenameFile(
  file: File,
  oldPrefix: string,
  newPrefix: string
) {
  const originalFilePath = file.name;
  const relativePath = originalFilePath.slice(oldPrefix.length);
  const newPath = path.join(newPrefix, relativePath);
  const newFilePath = EnsureNoPrefixSlash(newPath);
  console.log(`- renaming "${originalFilePath}" -> "${newFilePath}"`);
  const result = await file.move(newFilePath);
  return result[0];
}

export async function TryCopyFile(
  file: File,
  oldPrefix: string,
  newPrefix: string
) {
  const originalFilePath = file.name;
  const relativePath = originalFilePath.slice(oldPrefix.length);
  const newPath = path.join(newPrefix, relativePath);
  const newFilePath = EnsureNoPrefixSlash(newPath);
  console.log(`- copying "${originalFilePath}" -> "${newFilePath}"`);
  const result = await file.copy(newFilePath);
  return result[1];
}

export async function SetMetaProperty(file: File, key: string, newValue: {}): Promise<any> {
  const newValueString = JSON.stringify(newValue);
  const metaObj = { metadata: {} };
  metaObj.metadata[key] = newValueString;
  const res = await file.setMetadata(metaObj);
  return res[0];
}

export async function GetMetaProperty(file: File, key: string): Promise<any> {
  const [meta] = await file.getMetadata();
  const metaData = meta.metadata || {};
  const newValueString = metaData[key] || {};
  try {
    const newValueObj = JSON.parse(newValueString);
    return newValueObj;
  } catch (error) {
    console.error(`could not convert the meta property "${key}" to a JSON object`, error);
    return newValueString;
  }
}
