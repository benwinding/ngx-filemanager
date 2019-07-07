import { testHelper } from '../utils/test-helper';
import { sizeHelper } from './size-helper';
import { storage } from './storage-helper';

test('gets correct filesize in bytes', async () => {
  const testBucket = testHelper.getBucket();
  const testFolder = '/size-helper.spec.ts/test1/';
  await testHelper.delayMs(500);
  const file = testBucket.file(testFolder + 'test.txt');
  await file.save(new Buffer('hi there'));

  const bytes = await sizeHelper.GetActualFileSize(file);
  expect(bytes).toBe(8);
  await testHelper.removeDir(testBucket, testFolder);
}, 60000);

test('gets correct filesize in bytes from parent', async () => {
  const testBucket = testHelper.getBucket();
  const testFolderPath = '/size-helper.spec.ts/test2/';

  const parentFolderPath = testFolderPath + 'parentDir/';
  const parentFolder = testBucket.file(parentFolderPath);
  await testHelper.uploadTestFile(parentFolder);
  await testHelper.delayMs(500);

  const file = testBucket.file(parentFolderPath + 'test.txt');
  await file.save(new Buffer('hi there'));
  await testHelper.delayMs(500);
  await sizeHelper.AddSizeToParents(testBucket, file);
  await testHelper.delayMs(200);

  const bytes = await sizeHelper.ResolveFileSizeFromMeta(file);
  expect(bytes).toBe(8);
  await testHelper.removeDir(testBucket, testFolderPath);
}, 60000);
