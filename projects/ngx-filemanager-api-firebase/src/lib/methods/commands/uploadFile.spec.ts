import * as admin from 'firebase-admin';
import { logObj } from '../../utils/logger';
import { UploadFile } from './uploadFile';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('test upload file', async () => {
  const result = await UploadFile(
    testBucket,
    '/',
    'myfile.txt',
    'text/plain',
    new Buffer('hi there')
  );
  // files.map(f => (f.ref = null));
  logObj(result);
  expect(result).toBe(false);
});
