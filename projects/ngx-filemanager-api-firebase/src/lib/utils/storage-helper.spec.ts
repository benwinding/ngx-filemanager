import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import { SetMetaProperty, GetMetaProperty } from './storage-helper';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('set and get update permissions obj to object storage', async () => {
  const obj = {
    rand: uuid()
  } as any;
  const file = testBucket.file('storage-helper.spec.ts/file.txt');
  await SetMetaProperty(file, 'propname', obj);
  const objFromStorage = await GetMetaProperty(file, 'propname');
  expect(objFromStorage['rand']).toBe(obj.rand);
});
