import * as admin from 'firebase-admin';
import { GetListFromStorage } from './list';

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
