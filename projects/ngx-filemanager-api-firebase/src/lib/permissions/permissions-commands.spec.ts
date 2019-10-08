import { CoreTypes } from '../types';
import { testHelper } from '../utils/test-helper';
import { permsCommands } from './permissions-commands';
import { permsQueries } from './permissions-queries';

test('set permissions to file', async () => {
  const testBucket = testHelper.getBucket();
  const file1 = testBucket.file('permissions-commands.spec.ts/test12/file1.txt');
  await testHelper.uploadTestFile(file1);
  const blankPerms: CoreTypes.FilePermissionsObject = {
    readers: ['sacascasc'],
    writers: [],
    others: 'read'
  };
  await testHelper.delayMs(500);
  await permsCommands.UpdateFilePermissions(file1, blankPerms);
  await testHelper.delayMs(500);
  const uploadedPerms: CoreTypes.FilePermissionsObject = await permsQueries.RetrieveFilePermissions(file1);
  await testHelper.removeFile(testBucket, file1.name);
  expect(uploadedPerms.readers.length).toBe(1);
}, 60000);
