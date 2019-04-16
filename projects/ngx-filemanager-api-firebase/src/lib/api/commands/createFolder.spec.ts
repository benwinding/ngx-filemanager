import * as admin from 'firebase-admin';
import { CreateFolder } from './createFolder';
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

test('mkdir in /', async () => {
  const result = await CreateFolder(testBucket, '/test-222', null);
  // files.map(f => (f.ref = null));
  // logObj(result);
  // expect(result).toBe(4);
});
