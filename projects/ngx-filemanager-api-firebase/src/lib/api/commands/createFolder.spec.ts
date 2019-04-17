import * as admin from 'firebase-admin';
import { CreateFolder } from './createFolder';
import { testHelper } from '../../utils/test-helper';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('test creating and removing directory', async () => {
  const tempDir = '/createFolder/test1/temp';
  await CreateFolder(testBucket, tempDir, null);
  const exists = await testHelper.existsDir(testBucket, tempDir);
  expect(exists).toBeTruthy();
  await testHelper.removeDir(testBucket, tempDir);
});
