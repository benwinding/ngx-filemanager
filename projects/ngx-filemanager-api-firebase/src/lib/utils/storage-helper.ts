import { Bucket, File } from '../types/google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import { EnsureNoPrefixSlash } from './path-helpers';
import * as path from 'path';
import { VError } from 'verror';

export async function GetAllChildrenWithPrefix(
  bucket: Bucket,
  fileOrDirectoryPath: string
): Promise<File[]> {
  const pathNoPrefix = EnsureNoPrefixSlash(fileOrDirectoryPath);
  const options: GetFilesOptions = {};
  options.prefix = pathNoPrefix;
  try {
    const result = await bucket.getFiles(options);
    const files = result[0];
    return files;
  } catch (error) {
    throw new VError(error);
  }
}

export async function TryRenameFile(
  file: File,
  oldPrefix: string,
  newPrefix: string
) {
  try {
    const originalFilePath = file.name;
    const relativePath = originalFilePath.slice(oldPrefix.length);
    const newPath = path.join(newPrefix, relativePath);
    const newFilePath = EnsureNoPrefixSlash(newPath);
    console.log(`- renaming "${originalFilePath}" -> "${newFilePath}"`);
    const result = await file.move(newFilePath);
    return result[0];
  } catch (error) {
    throw new VError(error);
  }
}

export async function TryCopyFile(
  file: File,
  oldPrefix: string,
  newPrefix: string
) {
  try {
    const originalFilePath = file.name;
    const relativePath = originalFilePath.slice(oldPrefix.length);
    const newPath = path.join(newPrefix, relativePath);
    const newFilePath = EnsureNoPrefixSlash(newPath);
    console.log(`- copying "${originalFilePath}" -> "${newFilePath}"`);
    const result = await file.copy(newFilePath);
    return result[1];
  } catch (error) {
    throw new VError(error);
  }
}

export async function SetMetaProperty(
  file: File,
  key: string,
  newValue: {}
): Promise<any> {
  try {
    const newValueString = JSON.stringify(newValue);
    const metaObj = { metadata: {} };
    metaObj.metadata[key] = newValueString;
    const res = await file.setMetadata(metaObj);
    return res[0];
  } catch (error) {
    throw new VError(error);
  }
}

export async function GetMetaProperty(file: File, key: string): Promise<any> {
  let newValueString;
  try {
    const [meta] = await file.getMetadata();
    const metaData = meta.metadata || {};
    newValueString = metaData[key] || '{}';
  } catch (error) {
    throw new VError(error);
  }
  try {
    const newValueObj = JSON.parse(newValueString);
    return newValueObj;
  } catch (error) {
    console.error(
      `could not convert the meta property "${key}" to a JSON object`,
      error
    );
    return newValueString;
  }
}
