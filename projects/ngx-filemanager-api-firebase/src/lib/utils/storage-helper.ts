import * as path from 'path';
import * as request from 'request';
import { VError } from 'verror';
import { GetFilesOptions } from '@google-cloud/storage';

import { Bucket, File, FileFromStorage } from '../types/google-cloud-types';
import { paths } from './paths';
import { perms } from '../permissions';
import { CoreTypes } from '../types';
import {
  translateStorageToResFile,
  makePhantomStorageFolder,
  translateRawStorage,
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

async function TryRenameFile(
  file: File,
  oldPrefix: string,
  newPrefix: string
): Promise<CoreTypes.ResultObj> {
  try {
    const originalFilePath = file.name;
    const relativePath = originalFilePath.slice(oldPrefix.length);
    const newPath = path.join(newPrefix, relativePath);
    const newFilePath = paths.EnsureNoPrefixSlash(newPath);
    console.log(`- renaming "${originalFilePath}" -> "${newFilePath}"`);
    const [response] = await file.move(newFilePath);
    return { error: '', success: true };
  } catch (error) {
    const [fileExists] = await file.exists();
    console.error('storage-helper: TryCopyFile() error renaming file', {
      fileExists,
      fileName: file.name,
      oldPrefix,
      newPrefix,
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
      fileExists,
    });
    throw new VError(error);
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
    autoPaginate: false,
  } as any;
}

export function MakeOptionsList(inputDirectoryPath: string) {
  return {
    delimiter: '/',
    includeTrailingDelimiter: true,
    directory: inputDirectoryPath,
    autoPaginate: false,
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
        prefixes: prefixes,
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
    const files = storageObjects.map((o) => translateRawStorage(o));
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
    const allObjects = result.files.map((o) => translateRawStorage(o));

    const allObjectsPathsSet = new Set(allObjects.map((f) => f.ref.name));
    const phantomPrefixes = result.prefixes.filter(
      (prefix) => !allObjectsPathsSet.has(prefix)
    );

    const newPhantomFolders = phantomPrefixes.map((phantomPath) =>
      makePhantomStorageFolder(phantomPath)
    );
    const combinedList = [...allObjects, ...newPhantomFolders];
    const filesWithoutCurrentDirectory = combinedList.filter(
      (f) =>
        paths.EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath
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
      files.map((f) => translateStorageToResFile(f))
    );
    return resFiles;
  } catch (error) {
    throw new VError(error);
  }
}

async function GetParent(
  bucket: Bucket,
  filePath: string
): Promise<File | null> {
  const parentPath = paths.GetParentDir(filePath);
  if (!parentPath) {
    return null;
  }
  const parentObj = bucket.file(parentPath);
  return parentObj;
}

export async function UpdateParentsCountAdded(
  bucket: Bucket,
  filePath: string,
  fileSizeBytes: number
): Promise<any> {
  const parent = await GetParent(bucket, filePath);
  if (!parent) {
    return;
  }
  let res = { totalChildren: 0, totalBytes: 0 };
  try {
    res = await perms.queries.GetFolderProps(parent);
  } catch (error) {
    await parent.save('');
  }
  res.totalChildren++;
  res.totalBytes += fileSizeBytes;
  await Promise.all([
    perms.commands.SetFolderProps(parent, res.totalChildren, res.totalBytes),
    UpdateParentsCountAdded(bucket, parent.name, fileSizeBytes),
  ]);
}

export const storage = {
  GetListWithoutPermissions,
  GetAllChildrenWithPrefix,
  MakeOptionsListRoot,
  MakeOptionsList,
  TryRenameFile,
  TryCopyFile,
  TryCheckWritePermission,
  UpdateParentsCountAdded,
};
