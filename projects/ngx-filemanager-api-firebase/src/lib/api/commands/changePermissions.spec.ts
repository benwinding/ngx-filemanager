import * as uuid from 'uuid/v4';
import {
  TryChangeSingleFilePermissions,
  SetPermissionToObj
} from './changePermissions';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';

const testBucket = testHelper.testBucket;

test('set permissions to object', async () => {
  const oldPermissions = perms.factory.blankPermissionsObj();
  const entity = uuid();
  const newPermissions = SetPermissionToObj(oldPermissions, 'READER', entity);
  expect(newPermissions.readers).toBeTruthy();
}, 60000);

test('set permissions without any claims', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test1/file5.txt');
  const blankPerms: CoreTypes.FilePermissionsObject = {
    readers: [],
    writers: [],
    others: 'read'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);
  await testHelper.delayMs(500);
  const blankClaims = perms.factory.blankUserClaim();
  const shouldThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      '012e821',
      blankClaims
    );
  };
  await expect(shouldThrow()).rejects.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 60000);

test('set permissions with claims', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test2/file3.txt');
  const blankPerms: CoreTypes.FilePermissionsObject = {
    readers: [],
    writers: [],
    others: 'read/write'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);
  await testHelper.delayMs(500);

  const blankClaims = perms.factory.blankUserClaim();
  blankClaims.userIsSudo = true;

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      '1203182391',
      blankClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 60000);

test('set permissions with claims in group', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test3/file1.txt');
  const blankPerms: CoreTypes.FilePermissionsObject = {
    writers: ['12345'],
    readers: [],
    others: 'hidden'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);
  await testHelper.delayMs(500);

  const blankClaims = perms.factory.blankUserClaim();
  blankClaims.groups = ['12345'];

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      '11111',
      blankClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 60000);
