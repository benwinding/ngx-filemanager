import { Bucket, FileFromStorage, File } from '../../types/google-cloud-types';
import { EnsureGoogleStoragePathDir } from '../../utils/path-helpers';
import { GetFilesOptions } from '@google-cloud/storage';
import {
  translateRawStorage,
  makePhantomStorageFolder,
  translateStorageToResFile
} from '../../utils/translation-helpers';
import * as request from 'request';
import { GetPermissionForFile } from '../../utils/permissions-helper';
import {
  UserCustomClaims,
  ResFile
} from 'ngx-filemanager-core';
import { UserAccessResult } from '../../types/UserAccessResult';

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
  const result = await bucket.getFiles(options);
  const storageObjects = result[0];
  const files = storageObjects.map(o => translateRawStorage(o));
  return files;
}

export async function GetListFromStorage(
  bucket: Bucket,
  inputDirectoryPath: string
): Promise<FileFromStorage[]> {
  const googleStorageDirPath = EnsureGoogleStoragePathDir(inputDirectoryPath);
  const isRootPath = googleStorageDirPath === '/' || '';
  let options;
  if (isRootPath) {
    options = MakeOptionsListRoot();
  } else {
    options = MakeOptionsList(googleStorageDirPath);
  }
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
    f => EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath
  );
  return filesWithoutCurrentDirectory;
}

export async function GetList(
  bucket: Bucket,
  inputDirectoryPath: string,
  claims: UserCustomClaims
): Promise<ResFile[]> {
  const files = await GetListFromStorage(bucket, inputDirectoryPath);
  const resFiles = await Promise.all(
    files.map(f => translateStorageToResFile(f))
  );
  const filesAllowed = resFiles.filter(f => {
    const perms = GetPermissionForFile(f.permissions, claims);
    const minPerms = UserAccessResult.r__;
    return perms > minPerms;
  });
  return filesAllowed;
}
