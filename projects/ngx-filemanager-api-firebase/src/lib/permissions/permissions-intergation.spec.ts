import { testHelper } from '../utils/test-helper';
import { permsCommands } from './permissions-commands';
import { permsQueries } from './permissions-queries';
import { CoreTypes } from 'ngx-filemanager-core';

test('TryChangeSingleFilePermissions', async () => {
  const testBucket = testHelper.testBucket;
  const file = testBucket.file(
    'changePermissions/TryChangeSingleFilePermissions.txt'
  );
  await testHelper.uploadTestFile(file);
  const permissionsToSet = testHelper.blankPermissionWithGroups([
    { id: '0', name: 'name' }
  ]);
  await permsCommands.UpdateFilePermissions(file, permissionsToSet);
  const permissions: CoreTypes.PermissionsObject = await permsQueries.RetrieveFilePermissions(
    file
  );
  const group = permissions.groups.pop();
  expect(group.id).toBe('0');
  expect(group.name).toBe('name');
  await testHelper.removeFile(testBucket, file.name);
});
