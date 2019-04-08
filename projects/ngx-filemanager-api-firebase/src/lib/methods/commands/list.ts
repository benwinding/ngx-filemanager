import { Bucket, FileFromStorage } from '../google-cloud-types';
import { EnsureTrailingSlash, EnsureNoPrefixSlash } from '../path-helpers';
import { GetFilesOptions } from '@google-cloud/storage';
import {
  translateStorageToFileFromStorage,
  translateStorageDirToResFile,
  translateStorageFileToResFile
} from '../translation-helpers';
import { ResFile } from '../core-types';

export async function GetListFromStorage(
  bucket: Bucket,
  inputDirectoryPath: string
): Promise<FileFromStorage[]> {
  const pathNoPrefix = EnsureNoPrefixSlash(inputDirectoryPath);
  const pathParsed = EnsureTrailingSlash(pathNoPrefix);
  const options: GetFilesOptions = {
    delimiter: '/',
    includeTrailingDelimiter: true
  } as any;
  const isRoot = pathParsed === '/';
  if (!isRoot) {
    options.directory = pathParsed;
  }
  const result = await bucket.getFiles(options);
  const storageObjects = result[0];
  const files = storageObjects.map(o => translateStorageToFileFromStorage(o));
  console.log('file paths: ' + JSON.stringify(files.map(f => f.fullPath), null, 2));
  const filesWithoutCurrentDirectory = files.filter(f => f.fullPath !== pathParsed);
  return filesWithoutCurrentDirectory;
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
