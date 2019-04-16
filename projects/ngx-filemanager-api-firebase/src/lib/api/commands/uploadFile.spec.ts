import * as admin from 'firebase-admin';
import { logObj } from '../../utils/logger';
import { UploadFile } from './uploadFile';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('creates file and deletes it', async () => {
  const claims = {} as any;
  const result = await UploadFile(
    testBucket,
    '/uploadFile.spec.ts/',
    'myfile.txt',
    'text/plain',
    new Buffer('hi there'),
    claims
  );
  const file = testBucket.file('uploadFile.spec.ts/myfile.txt');
  const [exists] = await file.exists();
  expect(exists).toBe(true);
  if (exists) {
    file.delete();
  }
});
