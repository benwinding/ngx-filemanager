import { Bucket, File } from '../types/google-cloud-types';
import { VError } from 'verror';
import { paths } from './paths';
import { perms } from '../permissions';
import { CoreTypes } from 'ngx-filemanager-core';

import * as CICULAR from 'circular-json';
import * as admin from 'firebase-admin';
// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

function logObj(obj) {
  console.log(CICULAR.stringify(obj, null, 2));
}

function uploadTestFile(file: File) {
  const buffer = new Buffer('hi there');
  const fileOptions = {
    contentType: 'text/plain'
  };
  return file.save(buffer, fileOptions);
}

async function uploadTestFileWithPerms(
  file: File,
  permissionsObj: CoreTypes.PermissionsObject
) {
  const buffer = new Buffer('hi there');
  const fileOptions = {
    contentType: 'text/plain'
  };
  await file.save(buffer, fileOptions);
  await perms.commands.UpdateFilePermissions(file, permissionsObj);
}

function uploadTestFiles(files: File[]) {
  return Promise.all(files.map(file => uploadTestFile(file)));
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
  const pathParsed = paths.EnsureGoogleStoragePathFile(filePath);
  return tryRemove(bucket, pathParsed);
}

async function removeFiles(files: File[]) {
  await Promise.all(files.map(f => f.delete()));
}

async function removeDir(bucket: Bucket, dirPath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathDir(dirPath);
  return tryRemove(bucket, pathParsed);
}

async function existsFile(bucket: Bucket, filePath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathFile(filePath);
  return tryCheckExists(bucket, pathParsed);
}

async function existsDir(bucket: Bucket, filePath: string) {
  const pathParsed = paths.EnsureGoogleStoragePathDir(filePath);
  return tryCheckExists(bucket, pathParsed);
}

function blankPermissionWithUsers(
  users: CoreTypes.PermissionEntity[]
): CoreTypes.PermissionsObject {
  const newPermissions = perms.factory.blankPermissionsObj();
  newPermissions.users = users;
  return newPermissions;
}

function blankPermissionWithGroups(
  groups: CoreTypes.PermissionEntity[]
): CoreTypes.PermissionsObject {
  const newPermissions = perms.factory.blankPermissionsObj();
  newPermissions.groups = groups;
  return newPermissions;
}

export const testHelper = {
  blankPermissionWithUsers,
  blankPermissionWithGroups,
  uploadTestFile,
  uploadTestFiles,
  uploadTestFileWithPerms,
  removeFile,
  removeFiles,
  removeDir,
  existsFile,
  existsDir,
  logObj,
  testBucket
};
