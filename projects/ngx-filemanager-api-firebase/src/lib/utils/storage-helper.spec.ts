import * as uuid from 'uuid/v1';
import { storage } from './storage-helper';
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
});
