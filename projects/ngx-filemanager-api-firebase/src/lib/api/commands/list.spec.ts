import * as admin from 'firebase-admin';
import { GetListFromStorage, GetList } from './list';
import { testHelper } from '../../utils/test-helper';
import { PermissionEntity } from 'ngx-filemanager-core/public_api';
import { logObj } from '../../utils/logger';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('list get files in sub directory', async () => {
  const result = await GetListFromStorage(
    testBucket,
    'list.spec.ts/test1/sub1'
  );
  expect(result.length).toBe(3);
});

test('list get files and directories', async () => {
  const result = await GetListFromStorage(testBucket, 'list.spec.ts/test1');
  expect(result.length).toBe(3);
});

test('list get files with permissions', async () => {
  // Add files
  const file1 = testBucket.file('list.spec.ts/test2/file1.txt');
  const file2 = testBucket.file('list.spec.ts/test2/file2.txt');
  const files = [file1, file2];
  await Promise.all(files.map(file => testHelper.uploadTestFile(file)));
  // Set permissions
  const newPermissions = testHelper.blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: '0',
    type: 'user'
  };
  newPermissions.readers.push(entity);
  await testHelper.UpdateFilePermissions(file1, newPermissions);
  const result = await GetList(testBucket, 'list.spec.ts/test2', {
    groups: ['test2group']
  });
  // logObj({result});
  expect(result.length).toBe(1);
  await Promise.all(files.map(f => f.delete()));
});

test('list get files with permissions', async () => {
  // Add files
  const file1 = testBucket.file('list.spec.ts/test3/file1.txt');
  const file2 = testBucket.file('list.spec.ts/test3/file2.txt');
  const files = [file1, file2];
  await Promise.all(files.map(file => testHelper.uploadTestFile(file)));
  // Set permissions
  const newPermissions = testHelper.blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: '0ascacsasc',
    type: 'user'
  };
  newPermissions.readers.push(entity);
  await testHelper.UpdateFilePermissions(file1, newPermissions);
  const result = await GetList(testBucket, 'list.spec.ts/test3', {
    groups: ['0ascacsasc']
  });
  // logObj({result});
  expect(result.length).toBe(2);
  await Promise.all(files.map(f => f.delete()));
});


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