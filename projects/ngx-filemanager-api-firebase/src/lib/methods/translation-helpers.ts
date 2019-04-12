import { ResultObj, ResFile } from './core-types';
import {
  EnsurePrefixSlash,
  HasTrailingSlash,
  EnsureAbsolutePathDir,
  EnsureAbsolutePathFile
} from './path-helpers';
import { FileFromStorage, File } from './google-cloud-types';
import { Readable } from 'stream';
import * as request from 'request';
import * as path from 'path';

export function translateRawStorage(storageObject: File): FileFromStorage {
  const filePath = storageObject.name;
  const filePathParsed = EnsurePrefixSlash(filePath);
  return {
    ref: storageObject,
    name: path.basename(filePathParsed),
    fullPath: filePathParsed,
    isDir: HasTrailingSlash(filePathParsed)
  };
}

export function makePhantomStorageFolder(folderPath: string): FileFromStorage {
  const pathParsed = EnsureAbsolutePathDir(folderPath);
  return {
    ref: null,
    name: path.basename(pathParsed),
    fullPath: pathParsed,
    isDir: true,
    isPhantomFolder: true
  };
}

export async function translateStorageDirToResFile(
  f: FileFromStorage
): Promise<ResFile> {
  let metaUpdated = null;
  if (!f.isPhantomFolder) {
    const meta = await GetMeta(f);
    metaUpdated = meta.updated;
  }
  const pathParsed = EnsureAbsolutePathDir(f.fullPath);
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: pathParsed,
    size: '0',
    date: metaUpdated,
    type: 'dir',
    isPhantomFolder: f.isPhantomFolder
  };
}

export async function translateStorageFileToResFile(
  f: FileFromStorage
): Promise<ResFile> {
  const meta = await GetMeta(f);
  const pathParsed = EnsureAbsolutePathFile(f.fullPath);
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: pathParsed,
    size: meta.size,
    date: meta.updated,
    type: 'file'
  };
}

export async function GetMeta(f: FileFromStorage) {
  const metaResponse = await f.ref.getMetadata();
  const meta: any = metaResponse[0];
  return meta;
}

export async function StreamToPromise(stream: Readable): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let stringRes: string;
    stream.on('readable', function(buffer) {
      const part: string = buffer.read().toString() as string;
      stringRes += part;
      console.log('stream data ' + part);
    });
    stream.on('end', res => {
      resolve(stringRes);
    });
    stream.on('error', err => {
      const errmsg =
        'StreamToPromise(stream: Readable), Error reading stream: ' +
        err.message;
      console.error(errmsg, { err });
      reject(errmsg);
    });
  });
}

export function getResult(res: request.Response): ResultObj {
  const fail = res.statusCode !== 204;
  return {
    success: !fail,
    error: fail ? 'error: ' + res.body : null
  };
}

export function getResultFromArray(res: request.Response[]): ResultObj {
  const fail = res.find(r => r.statusCode !== 204);
  return {
    success: !fail,
    error: fail ? 'error: ' + JSON.stringify(fail.body) : null
  };
}
