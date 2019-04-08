import * as admin from 'firebase-admin';
import { logObj } from '../../utils/logger';
import { RemoveFileWithChildren } from './remove';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('get directory and all children /', async () => {
  const result = await RemoveFileWithChildren(testBucket, '/test-222/');
  // files.map(f => (f.ref = null));
  logObj(result);
  expect(result.length).toBe(1);
});
