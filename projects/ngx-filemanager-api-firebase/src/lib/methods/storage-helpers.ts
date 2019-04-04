import * as request from 'request';
import { Readable } from 'stream';
import { ResFile, ResultObj } from 'ngx-filemanager-core/public_api';
import { File, Bucket } from './google-cloud-types';
import { EnsureTrailingSlash, IsCurrentPath, IsCurrentPathFile, GetSubDirectory } from './path-helpers';
import * as path from 'path';

export interface FileFromStorage {
  ref: File;
  isDir: boolean;
  name: string;
  fullPath: string;
}

export async function translateStorageDirToResFile(f: FileFromStorage): Promise<ResFile> {
  const metaResponse = await f.ref.getMetadata();
  const meta = metaResponse[0];
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: f.fullPath,
    size: meta.size,
    date: meta.updated,
    type: 'dir'
  };
}

export async function translateStorageFileToResFile(f: FileFromStorage): Promise<ResFile> {
  const metaResponse = await f.ref.getMetadata();
  const meta = metaResponse[0];
  return {
    name: f.name,
    rights: 'rxrxrx',
    fullPath: f.fullPath,
    size: '0',
    date: meta.updated,
    type: 'file'
  };
}

export async function parseFilesInDirectory(storageObjects: File[], currentDirectoryPath) {
  const files: FileFromStorage[] = [];
  const subDirNames = new Set<string>();

  const storageObjectsRelativeFiles = storageObjects.filter(storageObject => {
    const objectPath = storageObject.name;
    if (IsCurrentPath(currentDirectoryPath, storageObject.name)) {
      return;
    }
  });
  const storageObjectsRelativeDirs = storageObjects.filter(storageObject => {
    const objectPath = storageObject.name;
    if (IsCurrentPath(currentDirectoryPath, storageObject.name)) {
      return;
    }
  });

  storageObjects.forEach((storageObject: File) => {
    const filePath = storageObject.name;
    if (IsCurrentPath(currentDirectoryPath, filePath)) {
      return;
    }
    if (IsCurrentPathFile(currentDirectoryPath, filePath)) {
      files.push({
        ref: storageObject,
        name: path.basename(filePath),
        fullPath: filePath,
        isDir: false
      });
      return;
    }
    // must be subpath
    const subDirName = GetSubDirectory(currentDirectoryPath, filePath);
    if (subDirNames.has(subDirName)) {
      return;
    }
    subDirNames.add(subDirName);
    const fullPathDirectory = path.join(currentDirectoryPath, subDirName);
    files.push({
      ref: storageObject,
      name: subDirName,
      fullPath: fullPathDirectory,
      isDir: true
    });
  });
  return Promise.all(files.map(f => {
    if (f.isDir) {
      return translateStorageDirToResFile(f);
    } else {
      return translateStorageFileToResFile(f);
    }
  }));
}

async function getRootList(bucket: Bucket) {
  const result = await bucket.getFiles();
  const storageObjects = result[0];
  const files = await parseFilesInDirectory(storageObjects, '');
  return files;
}

async function getSubList(bucket: Bucket, inputDirectoryPath: string) {
  const pathParsed = EnsureTrailingSlash(inputDirectoryPath);
  const result = await bucket.getFiles({ prefix: pathParsed });
  const storageObjects = result[0];
  const files = await parseFilesInDirectory(storageObjects, pathParsed);
  return files;
}

export async function getList(bucket: Bucket, directoryPath: string): Promise<ResFile[]> {
  const isRoot = directoryPath === '/';
  if (isRoot) {
    return getRootList(bucket);
  } else {
    return getSubList(bucket, directoryPath);
  }
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
      const errmsg = 'StreamToPromise(stream: Readable), Error reading stream: ' + err.message;
      console.error(errmsg, {err});
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
