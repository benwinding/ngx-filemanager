import { CreateFolder } from './createFolder';
import { testHelper } from '../../utils/test-helper';

const testBucket = testHelper.testBucket;

test('test creating and removing directory', async () => {
  const tempDir = '/createFolder/test1/temp';
  await CreateFolder(testBucket, tempDir, null);
  const exists = await testHelper.existsDir(testBucket, tempDir);
  expect(exists).toBeTruthy();
  await testHelper.removeDir(testBucket, tempDir);
});
