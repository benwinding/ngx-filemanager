import { Bucket, File } from '../types/google-cloud-types';
import {
  EnsureGoogleStoragePathDir,
  EnsureGoogleStoragePathFile
} from './path-helpers';
import {
  UpdateFilePermissions,
  blankPermissionsObj,
  RetrieveFilePermissions
} from './permissions-helper';
import { VError } from 'verror';

function uploadTestFile(file: File) {
  const buffer = new Buffer('hi there');
  const fileOptions = {
    contentType: 'text/plain'
  };
  return file.save(buffer, fileOptions);
}

async function tryCheckExists(bucket: Bucket, objectPath: string) {
  try {
    const file = bucket.file(objectPath);
    const [exists] = await file.exists();
    return exists;
  } catch (error) {
    throw new VError(error);
  }
}

async function tryRemove(bucket: Bucket, objectPath: string) {
  const file = bucket.file(objectPath);
  try {
    const [exists] = await file.exists();
    if (exists) {
      console.log('- deleting file: ', file.name);
      await file.delete();
    }
    return false;
  } catch (error) {
    throw new VError(error);
  }
}

async function removeFile(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathFile(filePath);
  return tryRemove(bucket, pathParsed);
}

async function removeDir(bucket: Bucket, dirPath: string) {
  const pathParsed = EnsureGoogleStoragePathDir(dirPath);
  return tryRemove(bucket, pathParsed);
}

async function existsFile(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathFile(filePath);
  return tryCheckExists(bucket, pathParsed);
}

async function existsDir(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathDir(filePath);
  return tryCheckExists(bucket, pathParsed);
}

export const testHelper = {
  uploadTestFile,
  removeFile,
  removeDir,
  existsFile,
  existsDir,
  blankPermissionsObj,
  UpdateFilePermissions,
  RetrieveFilePermissions
};
