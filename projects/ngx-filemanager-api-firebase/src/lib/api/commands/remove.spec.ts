import { RemoveFileWithChildren } from './remove';
import { testHelper } from '../../utils/test-helper';

test('remove item that dont exist', async () => {
  const testBucket = testHelper.getBucket();
  const result = await RemoveFileWithChildren(testBucket, '/cacsascas/');
  expect(result).toBe(true);
});

test('get directory and all children /', async () => {
  // const result = await RemoveFileWithChildren(testBucket, '/test-222/');
  // files.map(f => (f.ref = null));
  // testHelper.logObj(result);
  // expect(result.length).toBe(1);
});
