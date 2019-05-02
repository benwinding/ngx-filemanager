import * as uuid from 'uuid/v4';
import {
  storage,
  GetListFromStorage,
  GetListWithoutPermissions
} from './storage-helper';
import { testHelper } from './test-helper';

// Setup local firebase admin, using service account credentials
const testBucket = testHelper.testBucket;

test('set and get update permissions obj to object storage', async () => {
  const obj = {
    rand: uuid()
  } as any;
  const file = testBucket.file('storage-helper.spec.ts/file.txt');
  await storage.SetMetaProperty(file, 'propname', obj);
  const objFromStorage = await storage.GetMetaProperty(file, 'propname');
  expect(objFromStorage['rand']).toBe(obj.rand);
}, 60000);

test('list get files in sub directory', async () => {
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
