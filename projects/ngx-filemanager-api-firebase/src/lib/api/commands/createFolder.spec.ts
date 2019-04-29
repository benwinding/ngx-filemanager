import { CreateFolder, CreateFolderWithoutPermissions } from './createFolder';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { paths } from '../../utils/paths';

const testBucket = testHelper.testBucket;

test('test creating and removing directory no-permissions', async () => {
  const tempDir = '/createFolder/test1/temp';
  await CreateFolderWithoutPermissions(testBucket, tempDir);
  const exists = await testHelper.existsDir(testBucket, tempDir);
  expect(exists).toBeTruthy();
  await testHelper.removeDir(testBucket, tempDir);
});

test('test creating and removing directory with-permissions', async () => {
  const permissionsDir = '/createFolder/test1/parentPerms';
  await CreateFolderWithoutPermissions(testBucket, permissionsDir);
  const directoryPath = paths.EnsureGoogleStoragePathDir(permissionsDir);
  const file = testBucket.file(directoryPath);
  const newPermissions = testHelper.blankPermissionWithUsers([]);
  newPermissions.unix = '770';
  await perms.commands.UpdateFilePermissions(file, newPermissions);

  const shouldThrow = async () => {
    try {
      const permissionsDirSub = '/createFolder/test1/parentPerms/mysub';
      await CreateFolder(testBucket, permissionsDirSub, null);
    } catch (error) {
      throw new Error('Failed');
    }
  };
  expect(shouldThrow()).rejects.toThrowError();
  await testHelper.removeDir(testBucket, permissionsDir);
});

test('test creating and removing directory with-permissions', async () => {
  const permissionsDir = '/createFolder/test1/parentPerms';
  await CreateFolderWithoutPermissions(testBucket, permissionsDir);
  const directoryPath = paths.EnsureGoogleStoragePathDir(permissionsDir);
  const file = testBucket.file(directoryPath);
  const newPermissions = testHelper.blankPermissionWithUsers([]);
  newPermissions.unix = '770';
  await perms.commands.UpdateFilePermissions(file, newPermissions);

  const shouldThrow = async () => {
    try {
      const permissionsDirSub = '/createFolder/test1/parentPerms/mysub';
      await CreateFolder(testBucket, permissionsDirSub, null);
    } catch (error) {
      throw new Error('Failed');
    }
  };
  expect(shouldThrow()).rejects.toThrowError();
  await testHelper.removeDir(testBucket, permissionsDir);
});
