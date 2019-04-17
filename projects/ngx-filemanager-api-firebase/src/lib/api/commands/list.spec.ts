import * as admin from 'firebase-admin';
import { GetListFromStorage, GetList } from './list';
import { UploadFile } from './uploadFile';
import { UpdateFilePermissions } from '../../utils/permissions-helper';
import { blankPermisssionsObj } from './changePermissions';
import { PermissionEntity } from 'ngx-filemanager-core';

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

async function uploadTestFile(filePath: string) {
  const claims = {} as any;
  const result = await UploadFile(
    testBucket,
    '/',
    filePath,
    'text/plain',
    new Buffer('hi there'),
    claims
  );
}

test('list get files with permissions', async () => {
  const file1 = 'list.spec.ts/test2/file1.txt';
  const file2 = 'list.spec.ts/test2/file2.txt';
  const filePaths = [file1, file2];
  await Promise.all(filePaths.map(f => uploadTestFile(f)));
  const newPermissions = blankPermisssionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: '0',
    type: 'user'
  };
  newPermissions.readers.push(entity);
  const file1Object = testBucket.file(file1);
  await UpdateFilePermissions(file1Object, newPermissions);
  const result = await GetList(testBucket, 'list.spec.ts/test2', {
    groups: ['test2group']
  });
  expect(result.length).toBe(1);
  await Promise.all(filePaths.map(f => testBucket.file(f).delete()));
});
