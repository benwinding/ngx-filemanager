import * as uuid from 'uuid/v4';
import {
  storage,
  GetListFromStorage,
  GetListWithoutPermissions
} from './storage-helper';
import { testHelper } from './test-helper';
import { perms } from '../permissions';
import { permHelper } from '../permissions/permissions-helper';

test('set and get update permissions obj to object storage', async () => {
  const testBucket = testHelper.getBucket();
  const obj = {
    rand: uuid()
  } as any;
  await testHelper.removeFile(testBucket, 'storage-helper.spec.ts/file1.txt');
  const file = testBucket.file('storage-helper.spec.ts/file.txt');
  await testHelper.uploadTestFile(file);
  await permHelper.SetMetaPropertyObj(file, 'propname', obj);
  const objFromStorage = await permHelper.GetMetaPropertyObj(file, 'propname');
  expect(objFromStorage['rand']).toBe(obj.rand);
}, 60000);

test('list get files in sub directory', async () => {
  const testBucket = testHelper.getBucket();
  await testHelper.removeDir(testBucket, 'storage-helper.spec.ts/test2/sub1');
  await testHelper.uploadTestFiles([
    testBucket.file('storage-helper.spec.ts/test2/sub1/file1.txt'),
    testBucket.file('storage-helper.spec.ts/test2/sub1/file2.txt'),
    testBucket.file('storage-helper.spec.ts/test2/sub1/file3.txt')
  ]);
  const result = await GetListFromStorage(
    testBucket,
    'storage-helper.spec.ts/test2/sub1'
  );
  await testHelper.removeDir(testBucket, 'storage-helper.spec.ts/test2/sub1');
  expect(result.length).toBe(3);
}, 60000);

test('list get files and directories', async () => {
  const testBucket = testHelper.getBucket();
  await testHelper.uploadTestFiles([
    testBucket.file('storage-helper.spec.ts/test3/file1.txt'),
    testBucket.file('storage-helper.spec.ts/test3/file2.txt'),
    testBucket.file('storage-helper.spec.ts/test3/file3.txt')
  ]);
  const result = await GetListFromStorage(
    testBucket,
    'storage-helper.spec.ts/test3'
  );
  await testHelper.removeDir(testBucket, 'storage-helper.spec.ts/test3/');
  expect(result.length).toBe(3);
}, 60000);

test('list get files and directories and translate', async () => {
  const testBucket = testHelper.getBucket();
  await testHelper.removeDir(testBucket, 'storage-helper.spec.ts/test4/');
  await testHelper.uploadTestFiles([
    testBucket.file('storage-helper.spec.ts/test4/file1.txt'),
    testBucket.file('storage-helper.spec.ts/test4/file2.txt'),
    testBucket.file('storage-helper.spec.ts/test4/file3.txt')
  ]);
  const result = await GetListWithoutPermissions(
    testBucket,
    'storage-helper.spec.ts/test4'
  );
  await testHelper.removeDir(testBucket, 'storage-helper.spec.ts/test4/');
  expect(result.length).toBe(3);
}, 60000);

test('TryCheckWritePermission, of phantom dir, has permissions', async () => {
  const testBucket = testHelper.getBucket();
  const rootDir = '/storage-helper.spec.ts/test5/';
  // Upload dir with read/write permissions
  const permissionsObj = perms.factory.blankPermissionsObj();
  permissionsObj.others = 'read/write';
  await testHelper.uploadTestFileWithPerms(
    testBucket.file('storage-helper.spec.ts/test5/'),
    permissionsObj
  );
  await testHelper.delayMs(500);
  // Should be able to write to anything within that sub tree (if not exists)
  const shouldNotThrow = async () => {
    const subDirPath = rootDir + 'sub1/sub23/sub4/';
    const claims = perms.factory.blankUserClaim();
    await storage.TryCheckWritePermission(testBucket, subDirPath, claims);
  };
  await expect(shouldNotThrow()).resolves.not.toThrow();
  await testHelper.removeDir(testBucket, rootDir);
}, 60000);

test('TryCheckWritePermission, of phantom dir, no permission', async () => {
  const testBucket = testHelper.getBucket();
  const rootDir = '/storage-helper.spec.ts/test5/';
  // Upload dir with read/write permissions
  const permissionsObj = perms.factory.blankPermissionsObj();
  permissionsObj.others = 'read';
  await testHelper.uploadTestFileWithPerms(
    testBucket.file('storage-helper.spec.ts/test5/'),
    permissionsObj
  );
  await testHelper.delayMs(500);
  // Should be able to write to anything within that sub tree (if not exists)
  const shouldThrow = async () => {
    const subDirPath = rootDir + 'sub1/sub23/sub4/';
    const claims = perms.factory.blankUserClaim();
    await storage.TryCheckWritePermission(testBucket, subDirPath, claims);
  };
  await expect(shouldThrow()).rejects.toThrow();
  await testHelper.removeDir(testBucket, rootDir);
}, 60000);
