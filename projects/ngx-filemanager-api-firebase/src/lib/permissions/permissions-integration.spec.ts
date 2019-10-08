import { testHelper } from '../utils/test-helper';
import { permsCommands } from './permissions-commands';
import { permsQueries } from './permissions-queries';
import { CoreTypes } from '../types';

test('TryChangeSingleFilePermissions', async () => {
  const testBucket = testHelper.getBucket();
  const file = testBucket.file(
    'changePermissions/TryChangeSingleFilePermissions.txt'
  );
  await testHelper.uploadTestFile(file);
  const permissionsToSet = testHelper.blankPermissionWithWriters(['1234']);
  await permsCommands.UpdateFilePermissions(file, permissionsToSet);
  const permissions: CoreTypes.FilePermissionsObject = await permsQueries.RetrieveFilePermissions(
    file
  );
  const group = permissions.writers.pop();
  expect(group).toBe('1234');
  await testHelper.removeFile(testBucket, file.name);
}, 60000);
