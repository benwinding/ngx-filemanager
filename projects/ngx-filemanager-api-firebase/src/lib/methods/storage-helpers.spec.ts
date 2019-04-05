import * as admin from 'firebase-admin';
import {
  GetRootList,
  GetAllFilesInBucketDangerously,
  translateStorageToFileFromStorage,
  GetSubList,
  GetListFromStorage
} from './storage-helpers';
import * as CICULAR from 'circular-json';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

function logObj(obj) {
  console.log(CICULAR.stringify(obj, null, 2));
}

test('ls current files/directories in /root-dir-2', async () => {
  const files = await GetListFromStorage(testBucket, '/root-dir-2');
  files.map(f => (f.ref = null));
  // logObj(files);
  expect(files.length).toBe(4);
});

test('ls current files/directories in /', async () => {
  const files = await GetListFromStorage(testBucket, '/');
  files.map(f => (f.ref = null));
  // logObj(files);
  expect(files.length).toBe(4);
});
