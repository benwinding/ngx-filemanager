import { CreateFolder, CreateFolderWithoutPermissions, GetNextFreeFoldernameRecursively } from './createFolder';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { paths } from '../../utils/paths';

const testBucket = testHelper.testBucket;

test('test creating and removing directory no-permissions', async () => {
  const tempDir = '/createFolder.spec.ts/test1/temp';
  await CreateFolderWithoutPermissions(testBucket, tempDir);
  await testHelper.delayMs(200);
  const exists = await testHelper.existsDir(testBucket, tempDir);
  await testHelper.removeDir(testBucket, tempDir);
  await expect(exists).toBeTruthy();
}, 60000);

test('test creating and removing directory with-permissions', async () => {
  // Make parent directory
  const parentDir = '/createFolder.spec.ts/test2/parentPerms';
  await CreateFolderWithoutPermissions(testBucket, parentDir);
  const parentDirPath = paths.EnsureGoogleStoragePathDir(parentDir);
  const file = testBucket.file(parentDirPath);
  // Set parent permissions
  const newPermissions = testHelper.blankPermissionWithReaders([]);
  newPermissions.others = 'read';
  await perms.commands.UpdateFilePermissions(file, newPermissions);
  await testHelper.delayMs(200);
  const shouldThrow = async () => {
    const permissionsDirSub = '/createFolder.spec.ts/test2/parentPerms/mysub';
    return CreateFolder(testBucket, permissionsDirSub, null);
  };
  await expect(shouldThrow()).rejects.toThrow();
  await testHelper.removeDir(testBucket, parentDir);
}, 60000);

test('test with-permissions createDir and create parentDir', async () => {
  // Make parent directory
  const parentDir = '/createFolder.spec.ts/test3/';
  await CreateFolderWithoutPermissions(testBucket, parentDir);
  const parentDirPath = paths.EnsureGoogleStoragePathDir(parentDir);
  const file = testBucket.file(parentDirPath);
  // Set parent permissions
  const newPermissions = testHelper.blankPermissionWithReaders([]);
  newPermissions.others = 'read/write';
  await perms.commands.UpdateFilePermissions(file, newPermissions);
  await testHelper.delayMs(200);
  const shouldNotThrow = async () => {
    // Create sub directory in path without direct parent (should still work)
    const permissionsDirSub = '/createFolder.spec.ts/test3/parentPerms/mysub';
    return CreateFolder(testBucket, permissionsDirSub, null);
  };
  await expect(shouldNotThrow()).resolves.not.toThrow();
  await testHelper.removeDir(testBucket, parentDir);
}, 60000);

test('test create duplicate folder', async () => {
  // Make parent directory
  const parentDir = '/createFolder.spec.ts/test4/';
  const existingDir = '/createFolder.spec.ts/test4/exists1/';
  const nextDir = 'createFolder.spec.ts/test4/exists1 (2)/';
  const existing = testBucket.file(existingDir);

  await CreateFolderWithoutPermissions(testBucket, parentDir);
  await CreateFolderWithoutPermissions(testBucket, existingDir);
  const nextFile = await GetNextFreeFoldernameRecursively(testBucket, existing);

  await testHelper.delayMs(200);
  await expect(nextFile.name).toBe(nextDir);
  await testHelper.removeDir(testBucket, parentDir);
}, 60000);

