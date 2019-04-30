import { GetList } from './list';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';

const testBucket = testHelper.testBucket;

test('should list files with permissions', async () => {
  // Add files
  const file1 = testBucket.file('list.spec.ts/test2/file1.txt');
  const file2 = testBucket.file('list.spec.ts/test2/file2.txt');
  const files = [file1, file2];
  await testHelper.uploadTestFiles(files);
  // Set permissions
  const permissions = testHelper.blankPermissionWithWriters(['0002']);
  permissions.others = 'read';
  await perms.commands.UpdateFilePermissions(file1, permissions);
  const result = await GetList(testBucket, 'list.spec.ts/test2', {
    groups: ['0002']
  });
  // testHelper.logObj({result});
  await testHelper.removeDir(testBucket, 'list.spec.ts/test2');
  expect(result.length).toBe(2);
}, 60000);

test('should not list files with permissions', async () => {
  // Add files
  const file1 = testBucket.file('list.spec.ts/test3/file1.txt');
  const file2 = testBucket.file('list.spec.ts/test3/file2.txt');
  const files = [file1, file2];
  await testHelper.uploadTestFiles(files);
  // Set permissions
  const permissions = testHelper.blankPermissionWithWriters(['0ascacsasc']);
  permissions.others = 'hidden';
  await perms.commands.UpdateFilePermissions(file1, permissions);
  const result = await GetList(testBucket, 'list.spec.ts/test3', {
    groups: ['0ascacsasc']
  });
  // testHelper.logObj({result});
  await testHelper.removeDir(testBucket, 'list.spec.ts/test3');
  expect(result.length).toBe(1);
}, 60000);

/* response for http://localhost:8010/communitilink-r3/us-central1/ApiPublic/files: 400 Bad Request, {
    "error": "Bad request to ngx-file-manager!",
    "errorDetail": "Cannot read property 'readers' of undefined",
    "requestBody": {
        "action": "list",
        "bucketname": "communitilink-r3.appspot.com",
        "path": "/"
    }
}
 */
