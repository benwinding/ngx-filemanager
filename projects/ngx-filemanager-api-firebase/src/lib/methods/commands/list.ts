import { Bucket, FileFromStorage, File } from '../google-cloud-types';
import { EnsureNoPrefixSlash, EnsureNoTrailingSlash } from '../path-helpers';
import { GetFilesOptions } from '@google-cloud/storage';
import {
  translateRawStorage,
  translateStorageDirToResFile,
  translateStorageFileToResFile,
  makePhantomStorageFolder,
} from '../translation-helpers';
import { ResFile } from '../core-types';
import * as request from 'request';

interface FilesAndPrefixes {
  files: File[];
  prefixes: string[];
}

export async function GetFilesAndPrefixes(
  bucket: Bucket,
  prefix: string
): Promise<FilesAndPrefixes> {
  const options: GetFilesOptions = {
    delimiter: '/',
    includeTrailingDelimiter: true,
    prefix: prefix,
    autoPaginate: false
  } as any;

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
      const result: FilesAndPrefixes = { files: files || [], prefixes: prefixes };
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
  const pathNoPrefix = EnsureNoPrefixSlash(inputDirectoryPath);
  const pathParsed = EnsureNoTrailingSlash(pathNoPrefix);
  const result = await GetFilesAndPrefixes(bucket, pathParsed);
  const allObjects = result.files.map(o => translateRawStorage(o));

  const allObjectsPathsSet = new Set(allObjects.map(f => f.ref.name));
  const phantomPrefixes = result.prefixes.filter(prefix => !allObjectsPathsSet.has(prefix));

  const newPhantomFolders = phantomPrefixes.map(phantomPath => makePhantomStorageFolder(phantomPath));
  // console.log('file paths: ' + JSON.stringify(files.map(f => f.fullPath), null, 2));
  const combinedList = [
    ...allObjects,
    ...newPhantomFolders
  ];
  return combinedList;
}

export async function GetList(
  bucket: Bucket,
  inputDirectoryPath: string
): Promise<ResFile[]> {
  const files = await GetListFromStorage(bucket, inputDirectoryPath);
  return Promise.all(
    files.map(f => {
      if (f.isDir) {
        return translateStorageDirToResFile(f);
      } else {
        return translateStorageFileToResFile(f);
      }
    })
  );
}
