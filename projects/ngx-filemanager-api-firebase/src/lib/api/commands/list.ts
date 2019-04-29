import { Bucket, FileFromStorage, File } from '../../types/google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import {
  translateRawStorage,
  makePhantomStorageFolder,
  translateStorageToResFile
} from '../../utils/translation-helpers';
import * as request from 'request';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { perms } from '../../permissions';
import { CoreTypes } from 'ngx-filemanager-core';

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
  const googleStorageDirPath = paths.EnsureGoogleStoragePathDir(inputDirectoryPath);
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

export async function GetList(
  bucket: Bucket,
  inputDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResFile[]> {
  try {
    const resFiles = await GetListWithoutPermissions(bucket, inputDirectoryPath);
    const filesAllowed = resFiles.filter(f => {
      return perms.queries.TryCheckFileAccess(f.permissions, claims, 'read');
    });
    return filesAllowed;
  } catch (error) {
    throw new VError(error);
  }
}
