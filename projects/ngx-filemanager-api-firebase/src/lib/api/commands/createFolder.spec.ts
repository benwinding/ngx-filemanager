import { CreateFolder, CreateFolderWithoutPermissions } from './createFolder';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { paths } from '../../utils/paths';

const testBucket = testHelper.testBucket;

test('test creating and removing directory no-permissions', async () => {
  const tempDir = '/createFolder.spec.ts/test1/temp';
  await CreateFolderWithoutPermissions(testBucket, tempDir);
  const exists = await testHelper.existsDir(testBucket, tempDir);
  await testHelper.removeDir(testBucket, tempDir);
  await expect(exists).toBeTruthy();
}, 60000);

test('test creating and removing directory with-permissions', async () => {
  // Make parent directory
  const parentDir = '/createFolder.spec.ts/test1/parentPerms';
  await CreateFolderWithoutPermissions(testBucket, parentDir);
  const parentDirPath = paths.EnsureGoogleStoragePathDir(parentDir);
  const file = testBucket.file(parentDirPath);
  // Set parent permissions
  const newPermissions = testHelper.blankPermissionWithReaders([]);
  newPermissions.others = 'read';
  await perms.commands.UpdateFilePermissions(file, newPermissions);
  const shouldThrow = async () => {
    const permissionsDirSub = '/createFolder.spec.ts/test1/parentPerms/mysub';
    return CreateFolder(testBucket, permissionsDirSub, null);
  };
  await expect(shouldThrow()).rejects.toThrowError();
  await testHelper.removeDir(testBucket, parentDir);
}, 60000);

