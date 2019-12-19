import { FileFromStorage, File } from '../types/google-cloud-types';
import { Readable } from 'stream';
import * as request from 'request';
import * as path from 'path';
import { VError } from 'verror';
import { perms } from '../permissions';
import { paths } from './paths';
import { CoreTypes } from '../types';

export function translateRawStorage(storageObject: File): FileFromStorage {
  const filePath = storageObject.name;
  const filePathParsed = paths.EnsurePrefixSlash(filePath);
  return {
    ref: storageObject,
    name: path.basename(filePathParsed),
    fullPath: filePathParsed,
    isDir: paths.HasTrailingSlash(filePathParsed)
  };
}

export function makePhantomStorageFolder(folderPath: string): FileFromStorage {
  const pathParsed = paths.EnsureAbsolutePathDir(folderPath);
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
): Promise<CoreTypes.ResFile> {
  const resFile: CoreTypes.ResFile = {} as any;
  resFile.name = f.name;
  if (f.isDir) {
    resFile.type = 'dir';
    resFile.fullPath = paths.EnsureAbsolutePathDir(f.fullPath);
  } else {
    resFile.type = 'file';
    resFile.fullPath = paths.EnsureAbsolutePathFile(f.fullPath);
  }
  if (f.isPhantomFolder) {
    resFile.permissions = perms.factory.blankPermissionsObj();
    resFile.isPhantomFolder = true;
    return resFile;
  }
  try {
    const [exists] = await f.ref.exists();
    if (!exists) {
      throw new Error('File not found: ' + resFile.fullPath);
    }
    const [aclObj] = await f.ref.acl.get();
    resFile.rightsFirebase = aclObj as any;
    const metaResp = await f.ref.getMetadata();
    const metaData = metaResp[0];
    const customMeta = metaData.metadata || {};
    const permissions = await perms.queries.RetrieveFilePermissions(f.ref);
    resFile.permissions = permissions;
    resFile.size = metaData.size;
    resFile.date = metaData.updated;
    resFile.metaData = customMeta;
    return resFile;
  } catch (error) {
    throw new VError(error);
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
      const errmsg =
        'StreamToPromise(stream: Readable), Error reading stream: ' +
        err.message;
      console.error(errmsg, { err });
      reject(errmsg);
    });
  });
}

export function getResult(res: request.Response): CoreTypes.ResultObj {
  const fail = res.statusCode !== 204;
  return {
    success: !fail,
    error: fail ? 'error: ' + res.body : null
  };
}

export function getResultFromArray(
  res: request.Response[]
): CoreTypes.ResultObj {
  const fail = res.find(r => r.statusCode !== 204);
  return {
    success: !fail,
    error: fail ? 'error: ' + JSON.stringify(fail.body) : null
  };
}

export function ResultsObjFromArray(
  moveResults: CoreTypes.ResultObj[]
): CoreTypes.ResultObj {
  return moveResults.reduce(
    (acc, cur) => {
      if (cur.error) {
        acc.error += ' | ' + cur.error;
        acc.success = false;
      }
      return acc;
    },
    { error: '', success: true }
  );
}
