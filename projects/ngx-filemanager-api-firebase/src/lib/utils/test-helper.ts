import { Bucket, File } from '../types/google-cloud-types';
import { VError } from 'verror';
import { paths } from './paths';
import { perms } from '../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';

import * as CICULAR from 'circular-json';
import * as admin from 'firebase-admin';
import { storage } from './storage-helper';
// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';


function logObj(obj) {
  console.log(CICULAR.stringify(obj, null, 2));
}

function getBucket() {
  if (!admin.apps || !admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: testbucketname
    });
  }
  const testStorage = admin.storage();
  const testBucket = testStorage.bucket(testbucketname);
  return testBucket;
}

async function uploadTestFile(file: File) {
  const content = 'hi there' + Math.random().toString().slice(0, 20);
  const buffer = new Buffer(content);
  const fileOptions = {
    contentType: 'text/plain'
  };
  console.log('test-helper: uploadTestFile() about to try and upload test file: ', {fileName: file.name});
  try {
    await delay(500);
    await file.save(buffer, fileOptions);
  } catch (error) {
    console.error('test-helper: uploadTestFile', {fileName: file.name}, error);
    throw new Error(error);
  }
  await delay(500);
}

async function uploadTestFileWithPerms(
  file: File,
  permissionsObj: CoreTypes.FilePermissionsObject
) {
  const buffer = new Buffer('hi there');
  const fileOptions = {
    contentType: 'text/plain'
  };

  try {
    await delay(500);
    await file.save(buffer, fileOptions);
    await delay(500);
    await perms.commands.UpdateFilePermissions(file, permissionsObj);
    await delay(500);
  } catch (error) {
    console.error('test-helper: uploadTestFile', {fileName: file.name}, error);
    throw new Error(error);
  }
}

async function uploadTestFiles(files: File[]) {
  try {
    for (const file of files) {
      await uploadTestFile(file);
    }
  } catch (error) {
    console.error('test-helper uploadTestFiles()', {filenames: files.map(f => f.name)});
    throw new VError(error);
  }
}

async function uploadTestFilesWithPerms(
  files: File[],
  permissionsObj: CoreTypes.FilePermissionsObject
) {
  try {
    for (const file of files) {
      await uploadTestFileWithPerms(file, permissionsObj);
    }
  } catch (error) {
    console.error('test-helper uploadTestFilesWithPerms()', {filenames: files.map(f => f.name)});
    throw new VError(error);
  }
}

async function tryCheckExists(bucket: Bucket, objectPath: string) {
  try {
    await delay(100);
    const file = bucket.file(objectPath);
    const [exists] = await file.exists();
    await delay(100);
    return exists;
  } catch (error) {
    throw new VError(error);
  }
}

async function tryRemove(bucket: Bucket, objectPath: string) {
  try {
    console.log('test-helper: deleting object: ' + objectPath);
    const file = bucket.file(objectPath);
    await delay(500);
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
    }
    await delay(500);
    return false;
  } catch (error) {
    console.log(
      "test-helper: tryRemove() unable to delete file that doesn't exist...",
      { objectPath }
    );
  }
  await delay(500);
}

async function removeFile(bucket: Bucket, filePath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathFile(filePath);
  return tryRemove(bucket, pathParsed);
}

async function removeFiles(files: File[]) {
  await Promise.all(files.map(f => f.delete()));
}

async function removeDir(bucket: Bucket, dirPath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathDir(dirPath);
  await delay(200);
  await tryRemove(bucket, pathParsed);
  await delay(200);
  console.log('test-helper: removeDir() removed directory', { dirPath });
  try {
    const childrenToRemove = await storage.GetAllChildrenWithPrefix(
      bucket,
      pathParsed
    );
    for (const child of childrenToRemove) {
      await delay(100);
      await child.delete();
    }
    await delay(100);
  } catch (error) {
    console.log('test-helper: removeDir() problem removing children of path', {
      dirPath
    });
  }
}

async function existsFile(bucket: Bucket, filePath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathFile(filePath);
  return tryCheckExists(bucket, pathParsed);
}

async function existsDir(bucket: Bucket, filePath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathDir(filePath);
  return tryCheckExists(bucket, pathParsed);
}

function blankPermissionWithReaders(
  readers: CoreTypes.FilePermissionEntity[]
): CoreTypes.FilePermissionsObject {
  const newPermissions = perms.factory.blankPermissionsObj();
  newPermissions.readers = readers;
  return newPermissions;
}

function blankPermissionWithWriters(
  writers: CoreTypes.FilePermissionEntity[]
): CoreTypes.FilePermissionsObject {
  const newPermissions = perms.factory.blankPermissionsObj();
  newPermissions.writers = writers;
  return newPermissions;
}

async function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export const testHelper = {
  blankPermissionWithReaders,
  blankPermissionWithWriters,
  uploadTestFile,
  uploadTestFileWithPerms,
  uploadTestFiles,
  uploadTestFilesWithPerms,
  removeFile,
  removeFiles,
  removeDir,
  existsFile,
  existsDir,
  logObj,
  getBucket,
  delayMs: delay
};
