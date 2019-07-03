import { UploadFile, GetNextFreeFilenameRecursively } from './uploadFile';
import { testHelper } from '../../utils/test-helper';

test('creates file and deletes it', async () => {
  const testBucket = testHelper.getBucket();
  const claims = {} as any;
  const result = await UploadFile(
    testBucket,
    '/uploadFile.spec.ts/upload/',
    'myfile.txt',
    'text/plain',
    new Buffer('hi there'),
    claims
  );
  await testHelper.delayMs(500);
  const file = testBucket.file('uploadFile.spec.ts/upload/myfile.txt');
  const exists = await testHelper.existsFile(testBucket, file.name);
  expect(exists).toBe(true);
  await testHelper.removeDir(testBucket, '/uploadFile.spec.ts/upload/');
}, 60000);

test('get next filename in directory', async () => {
  const testBucket = testHelper.getBucket();
  const existingPath1 = 'uploadFile.spec.ts/test2/file2.txt';
  const existingPath2 = 'uploadFile.spec.ts/test2/file2 (2).txt';
  const existingFile = testBucket.file(existingPath1);
  await testHelper.uploadTestFile(existingFile);
  await testHelper.delayMs(500);
  const nextFile = await GetNextFreeFilenameRecursively(testBucket, existingFile);
  expect(nextFile.name).toBe(existingPath2);
  await testHelper.removeDir(testBucket, '/uploadFile.spec.ts/test2/');
}, 60000);

test('get next filename in directory recursive', async () => {
  const testBucket = testHelper.getBucket();
  const existingPath1 = 'uploadFile.spec.ts/test3/file.txt';
  const existingPath2 = 'uploadFile.spec.ts/test3/file (2).txt';
  const existingPath3 = 'uploadFile.spec.ts/test3/file (2) (2).txt';
  const existingFile = testBucket.file(existingPath1);
  const existingFile2 = testBucket.file(existingPath2);
  await testHelper.uploadTestFiles([existingFile, existingFile2]);
  await testHelper.delayMs(500);
  const nextFile = await GetNextFreeFilenameRecursively(testBucket, existingFile);
  await testHelper.removeDir(testBucket, '/uploadFile.spec.ts/test3/');
  expect(nextFile.name).toBe(existingPath3);
}, 60000);
