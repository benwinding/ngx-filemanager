import { File } from '../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core';
import { storage } from '../utils/storage-helper';
import { testHelper } from '../utils/test-helper';
import { permsCommands } from './permissions-commands';

const testBucket = testHelper.testBucket;

test('set permissions without access', async () => {
  const file1 = testBucket.file('permissions-commands.spec.ts/test1/file1.txt');
  await testHelper.uploadTestFile(file1);
  const blankPerms = testHelper.blankPermissionWithUsers([
    { name: 'asc', id: '11111' }
  ]);
  await permsCommands.UpdateFilePermissions(file1, blankPerms);
  const uploadedPerms: CoreTypes.PermissionsObject = await storage.GetMetaProperty(file1, 'permissions');
  expect(uploadedPerms.users.length).toBe(1);
  await testHelper.removeFile(testBucket, file1.name);
});
