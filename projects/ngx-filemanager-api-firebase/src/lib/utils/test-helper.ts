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

async function uploadTestFile(file: File) {
  const buffer = new Buffer('hi there');
  const fileOptions = {
    contentType: 'text/plain'
  };
  await file.save(buffer, fileOptions);
}

async function removeFile(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathFile(filePath);
  const file = bucket.file(pathParsed);
  const [exists] = await file.exists();
  if (exists) {
    console.log('- deleting file: ', file.name);
    await file.delete();
    return true;
  }
  return false;
}

async function removeDir(bucket: Bucket, dirPath: string) {
  const pathParsed = EnsureGoogleStoragePathDir(dirPath);
  const dir = bucket.file(pathParsed);
  const [exists] = await dir.exists();
  if (exists) {
    console.log('- deleting directory: ', dir.name);
    await dir.delete();
    return true;
  }
  return false;
}

async function existsFile(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathFile(filePath);
  const file = bucket.file(pathParsed);
  const [exists] = await file.exists();
  return exists;
}

async function existsDir(bucket: Bucket, filePath: string) {
  const pathParsed = EnsureGoogleStoragePathDir(filePath);
  const dir = bucket.file(pathParsed);
  const [exists] = await dir.exists();
  return exists;
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
