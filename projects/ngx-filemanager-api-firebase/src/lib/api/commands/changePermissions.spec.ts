import * as uuid from 'uuid/v1';
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
  const entity: CoreTypes.PermissionEntity = {
    name: 'Dan',
    id: uuid()
  };
  const newPermissions = SetPermissionToObj(oldPermissions, 'READER', entity);
  expect(newPermissions.groups).toBeTruthy();
});

test('set permissions without any claims', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test1/file1.txt');
  const blankPerms: CoreTypes.PermissionsObject = {
    users: [],
    groups: [],
    unix: '770'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);
  const blankClaims = perms.factory.blankUserClaim();
  const shouldThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      { name: 'asc', id: '012e821' },
      blankClaims
    );
  };
  await expect(shouldThrow()).rejects.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 30000);

test('set permissions with claims', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test2/file3.txt');
  const blankPerms: CoreTypes.PermissionsObject = {
    users: [],
    groups: [],
    unix: '770'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);

  const blankClaims = perms.factory.blankUserClaim();
  blankClaims.userIsSudo = true;

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      { name: 'asc', id: '11111' },
      blankClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 30000);

test('set permissions with claims in group', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test3/file1.txt');
  const blankPerms: CoreTypes.PermissionsObject = {
    users: [],
    groups: [{ name: 'Residents', id: '12345' }],
    unix: '770'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);

  const blankClaims = perms.factory.blankUserClaim();
  blankClaims.groups = ['12345'];

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      { name: 'asc', id: '11111' },
      blankClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 30000);

test('set permissions with claims in group', async () => {
  const file1 = testBucket.file('changePermissions.spec.ts/test4/file1.txt');
  const blankPerms: CoreTypes.PermissionsObject = {
    users: [],
    groups: [{ name: 'Residents', id: '12345' }],
    unix: '770'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);

  const blankClaims = perms.factory.blankUserClaim();
  blankClaims.groups = ['12345'];

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissions(
      file1,
      'WRITER',
      { name: 'asc', id: '11111' },
      blankClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 30000);
