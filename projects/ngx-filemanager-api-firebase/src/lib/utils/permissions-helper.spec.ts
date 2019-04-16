import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import { SetMetaProperty, GetMetaProperty } from './storage-helper';
import { RetrieveFilePermissions } from './permissions-helper';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('get permissions obj to object storage', async () => {
  const file = testBucket.file('permissions-helper.spec.ts/blankPermissions.txt');
  const permissions = await RetrieveFilePermissions(file);
  const isEmpty = Object.entries(permissions).length < 1;
  expect(isEmpty).toBe(true);
});

test('update custom meta property', async () => {
  const file = testBucket.file('permissions-helper.spec.ts/blankPermissions.txt');
  const permissions = await RetrieveFilePermissions(file);
  const isEmpty = Object.entries(permissions).length < 1;
  expect(isEmpty).toBe(true);
});
