import * as path from 'path';
import * as request from 'request';
import { VError } from 'verror';
import { GetFilesOptions } from '@google-cloud/storage';

import { Bucket, File, FileFromStorage } from '../types/google-cloud-types';
import { paths } from './paths';
import { perms } from '../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import {
  translateStorageToResFile,
  makePhantomStorageFolder,
  translateRawStorage
} from './translation-helpers';

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
    let fileExists: boolean;
    try {
      [fileExists] = await file.exists();
    } catch (e) {
      console.error(
        'storage-helper: SetMetaProperty() error getting file.exists',
        e
      );
    }
    console.error('storage-helper: SetMetaProperty() error setting meta', {
      fileExists,
      filePath: file.name,
      newValue
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
    const isRoot = parentPath === '';
    if (isRoot) {
      return;
    }
    const parentDir = bucket.file(parentPath);
    const [fileExists] = await parentDir.exists();
    if (!fileExists) {
      return TryCheckWritePermission(bucket, parentPath, claims);
    }
    const parentPermissions = await perms.queries.RetrieveFilePermissions(
      parentDir
    );
    const result = perms.queries.TryCheckFileAccess(
      parentPermissions,
      claims,
      'write'
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

// LIST

interface FilesAndPrefixes {
  files: File[];
  prefixes: string[];
}

export function MakeOptionsListRoot(): GetFilesOptions {
  return {
    delimiter: '/',
    includeTrailingDelimiter: true,
    autoPaginate: false
  } as any;
}

export function MakeOptionsList(inputDirectoryPath: string) {
  return {
    delimiter: '/',
    includeTrailingDelimiter: true,
    directory: inputDirectoryPath,
    autoPaginate: false
  } as any;
}

export async function GetFilesAndPrefixes(
  bucket: Bucket,
  options: GetFilesOptions
): Promise<FilesAndPrefixes> {
  return new Promise<FilesAndPrefixes>((resolve, reject) => {
    const callback = (
      err: Error | null,
      files?: File[],
      nextQuery?: {},
      apiResponse?: request.Response
    ) => {
      if (err) {
        reject(err);
        return;
      }
      const prefixes = apiResponse['prefixes'] || [];
      const result: FilesAndPrefixes = {
        files: files || [],
        prefixes: prefixes
      };
      resolve(result);
    };
    bucket.getFiles(options, callback);
  });
}

export async function GetFiles(
  bucket: Bucket,
  options: GetFilesOptions
): Promise<FileFromStorage[]> {
  try {
    const result = await bucket.getFiles(options);
    const storageObjects = result[0];
    const files = storageObjects.map(o => translateRawStorage(o));
    return files;
  } catch (error) {
    throw new VError(error);
  }
}

export async function GetListFromStorage(
  bucket: Bucket,
  inputDirectoryPath: string
): Promise<FileFromStorage[]> {
  const googleStorageDirPath = paths.EnsureGoogleStoragePathDir(
    inputDirectoryPath
  );
  const isRootPath = googleStorageDirPath === '/' || '';
  let options;
  if (isRootPath) {
    options = MakeOptionsListRoot();
  } else {
    options = MakeOptionsList(googleStorageDirPath);
  }
  try {
    const result = await GetFilesAndPrefixes(bucket, options);
    const allObjects = result.files.map(o => translateRawStorage(o));

    const allObjectsPathsSet = new Set(allObjects.map(f => f.ref.name));
    const phantomPrefixes = result.prefixes.filter(
      prefix => !allObjectsPathsSet.has(prefix)
    );

    const newPhantomFolders = phantomPrefixes.map(phantomPath =>
      makePhantomStorageFolder(phantomPath)
    );
    const combinedList = [...allObjects, ...newPhantomFolders];
    const filesWithoutCurrentDirectory = combinedList.filter(
      f => paths.EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath
    );
    return filesWithoutCurrentDirectory;
  } catch (error) {
    throw new VError(error);
  }
}

export async function GetListWithoutPermissions(
  bucket: Bucket,
  inputDirectoryPath: string
): Promise<CoreTypes.ResFile[]> {
  try {
    const files = await GetListFromStorage(bucket, inputDirectoryPath);
    const resFiles = await Promise.all(
      files.map(f => translateStorageToResFile(f))
    );
    return resFiles;
  } catch (error) {
    throw new VError(error);
  }
}

export const storage = {
  GetListWithoutPermissions,
  GetAllChildrenWithPrefix,
  MakeOptionsListRoot,
  MakeOptionsList,
  TryRenameFile,
  TryCopyFile,
  TryCheckWritePermission,
  SetMetaProperty,
  GetMetaProperty
};
