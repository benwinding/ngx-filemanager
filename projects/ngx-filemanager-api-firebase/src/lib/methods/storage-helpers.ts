import * as request from 'request';
import { Readable } from 'stream';
import { ResFile, ResultObj } from 'ngx-filemanager-core/public_api';
import { File, Bucket } from './google-cloud-types';

interface FileFromStorage {
  ref: File;
  isDir: boolean;
  name: string;
  fullPath: string;
}

async function translateStorageToResFile(f: FileFromStorage): Promise<ResFile> {
  const metaResponse = await f.ref.getMetadata();
  const meta = metaResponse[0];
  const isDir = f.isDir;
  if (isDir) {
    return {
      name: f.name,
      rights: 'rxrxrx',
      fullPath: f.fullPath,
      size: meta.size,
      date: meta.updated,
      type: 'dir'
    };
  } else {
    return {
      name: f.name,
      rights: 'rxrxrx',
      fullPath: f.fullPath,
      size: '0',
      date: meta.updated,
      type: 'file'
    };
  }
}

async function parseFilesInDirectory(storageObjects: File[], pathParsed) {
  const files: FileFromStorage[] = [];
  const subDirNames = new Set<string>();

  storageObjects.forEach(storageObject => {
    const objectPath = storageObject.name;
    const relativePath = objectPath.slice(pathParsed.length);
    const isCurrentDir = !relativePath;
    if (isCurrentDir) {
      return;
    }
    const slashSegments = relativePath.split('/');
    const isRelativeFile = slashSegments.length < 2;
    if (isRelativeFile) {
      files.push({
        ref: storageObject,
        name: slashSegments.shift(),
        fullPath: objectPath,
        isDir: false
      });
      return;
    }
    // must be subpath
    const subDirName = slashSegments.shift();
    const hasBeenAdded = subDirNames.has(subDirName);
    if (hasBeenAdded) {
      return;
    }
    subDirNames.add(subDirName);
    const fullPathDirectory = pathParsed + subDirName;
    files.push({
      ref: storageObject,
      name: subDirName,
      fullPath: fullPathDirectory,
      isDir: true
    });
  });
  return Promise.all(files.map(f => translateStorageToResFile(f)));
}

async function getRootList(bucket: Bucket) {
  const result = await bucket.getFiles();
  const storageObjects = result[0];
  const files = await parseFilesInDirectory(storageObjects, '');
  return files;
}

async function getSubList(bucket: Bucket, inputPath: string) {
  const hasTrailing = inputPath.slice(-1) === '/';
  const pathParsed = hasTrailing ? inputPath : inputPath + '/';
  const result = await bucket.getFiles({ prefix: pathParsed });
  const storageObjects = result[0];
  const files = await parseFilesInDirectory(storageObjects, pathParsed);
  return files;
}

export async function getList(bucket: Bucket, path: string) {
  if (path === '/') {
    return getRootList(bucket);
  } else {
    return getSubList(bucket, path);
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
