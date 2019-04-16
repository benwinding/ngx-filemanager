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

export async function translateStorageToResFile(
  f: FileFromStorage
): Promise<ResFile> {
  const resFile: ResFile = {} as any;
  resFile.name = f.name;
  if (f.isDir) {
    resFile.type = 'dir';
    resFile.fullPath = EnsureAbsolutePathDir(f.fullPath);
  } else {
    resFile.type = 'file';
    resFile.fullPath = EnsureAbsolutePathFile(f.fullPath);
  }
  if (f.isPhantomFolder) {
    resFile.isPhantomFolder = true;
    return resFile;
  }
  const [aclObj] = await f.ref.acl.get();
  resFile.rightsFirebase = aclObj as any;
  const metaResp = await f.ref.getMetadata();
  const metaData = metaResp[0];
  const customMeta = metaData.metadata || {};
  const permissionsStr = customMeta.permissions || '{}';
  const permissions = JSON.parse(permissionsStr);
  resFile.permissions = permissions;
  resFile.size = metaData.size;
  resFile.date = metaData.updated;
  resFile.metaData = metaData.updated;
  return resFile;
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
