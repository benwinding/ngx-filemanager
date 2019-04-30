import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { storage } from '../utils/storage-helper';
import { testHelper } from '../utils/test-helper';
import { permsCommands } from './permissions-commands';

const testBucket = testHelper.testBucket;

test('set permissions to file', async () => {
  const file1 = testBucket.file('permissions-commands.spec.ts/test12/file1.txt');
  await testHelper.uploadTestFile(file1);
  const blankPerms: CoreTypes.FilePermissionsObject = {
    readers: ['sacascasc'],
    writers: [],
    others: 'read'
  };
  await permsCommands.UpdateFilePermissions(file1, blankPerms);
  const uploadedPerms: CoreTypes.FilePermissionsObject = await storage.GetMetaProperty(file1, 'permissions');
  expect(uploadedPerms.readers.length).toBe(1);
  await testHelper.removeFile(testBucket, file1.name);
});
