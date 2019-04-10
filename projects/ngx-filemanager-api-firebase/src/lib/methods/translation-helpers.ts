import { ResultObj, ResFile } from './core-types';
import { HasTrailingSlash } from './path-helpers';
import { FileFromStorage, File } from './google-cloud-types';
import { Readable } from 'stream';
import * as request from 'request';
import * as path from 'path';

export function translateRawStorage(
  storageObject: File
): FileFromStorage {
  const filePath = storageObject.name;
  return {
    ref: storageObject,
    name: path.basename(filePath),
    fullPath: filePath,
    isDir: HasTrailingSlash(filePath)
  };
}

export function makePhantomStorageFolder(
  folderPath: string
): FileFromStorage {
  return {
    ref: null,
    name: path.basename(folderPath),
    fullPath: folderPath,
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
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: f.fullPath,
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
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: f.fullPath,
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
