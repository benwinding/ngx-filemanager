import { Bucket, File } from '../types/google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import * as path from 'path';
import { VError } from 'verror';
import { paths } from './paths';
import { perms } from '../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';

async function GetAllChildrenWithPrefix(
  bucket: Bucket,
  fileOrDirectoryPath: string
): Promise<File[]> {
  const pathNoPrefix = paths.EnsureNoPrefixSlash(fileOrDirectoryPath);
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

async function TryRenameFile(file: File, oldPrefix: string, newPrefix: string) {
  try {
    const originalFilePath = file.name;
    const relativePath = originalFilePath.slice(oldPrefix.length);
    const newPath = path.join(newPrefix, relativePath);
    const newFilePath = paths.EnsureNoPrefixSlash(newPath);
    console.log(`- renaming "${originalFilePath}" -> "${newFilePath}"`);
    const result = await file.move(newFilePath);
    return result[0];
  } catch (error) {
    const [fileExists] = await file.exists();
    console.error('storage-helper: TryCopyFile() error renaming file', {
      fileExists
    });
    throw new VError(error);
  }
}

async function TryCopyFile(file: File, oldPrefix: string, newPrefix: string) {
  try {
    const originalFilePath = file.name;
    const relativePath = originalFilePath.slice(oldPrefix.length);
    const newPath = path.join(newPrefix, relativePath);
    const newFilePath = paths.EnsureNoPrefixSlash(newPath);
    console.log(`- copying "${originalFilePath}" -> "${newFilePath}"`);
    const result = await file.copy(newFilePath);
    return result[1];
  } catch (error) {
    const [fileExists] = await file.exists();
    console.error('storage-helper: TryCopyFile() error copying file', {
      fileExists
    });
    throw new VError(error);
  }
}

async function SetMetaProperty(
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
    const [fileExists] = await file.exists();
    console.error('storage-helper: SetMetaProperty() error setting meta', {
      fileExists
    });
    throw new Error(error);
  }
}

async function GetMetaProperty(file: File, key: string): Promise<any> {
  let newValueString;
  try {
    const [meta] = await file.getMetadata();
    const metaData = meta.metadata || {};
    newValueString = metaData[key] || null;
  } catch (error) {
    const [fileExists] = await file.exists();
    console.error('storage-helper: GetMetaProperty() error getting meta', {
      fileExists
    });
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

async function TryCheckWritePermission(
  bucket: Bucket,
  newDirPath: string,
  claims: CoreTypes.UserCustomClaims
): Promise<any> {
  try {
    const parentPath = paths.GetParentDir(newDirPath);
    const parentDir = bucket.file(parentPath);
    const parentPermissions = await perms.queries.RetrieveFilePermissions(
      parentDir
    );
    const result = perms.queries.TryCheckFileAccess(
      parentPermissions,
      claims,
      'read'
    );
    if (!result) {
      throw new Error(
        'Permission denied creating item in directory:' + parentPath
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const storage = {
  GetAllChildrenWithPrefix,
  TryRenameFile,
  TryCopyFile,
  TryCheckWritePermission,
  SetMetaProperty,
  GetMetaProperty
};
