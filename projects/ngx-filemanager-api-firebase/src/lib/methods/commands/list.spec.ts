import * as admin from 'firebase-admin';
import { GetList } from './list';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('ls current files/directories in /root-dir-2', async () => {
  const files = await GetList(testBucket, '/root-dir-2');
  // files.map(f => (f.ref = null));
  // logObj(files);
  expect(files.length).toBe(4);
});

test('ls current files/directories in /', async () => {
  const files = await GetList(testBucket, '/');
  // files.map(f => (f.ref = null));
  // logObj(files);
  expect(files.length).toBe(4);
});
