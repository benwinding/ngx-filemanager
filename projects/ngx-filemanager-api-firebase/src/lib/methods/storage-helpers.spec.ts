import * as admin from 'firebase-admin';
import { NgxFileMangerApiFireBaseClass } from './firebase-storage-api';
import {
  ReqBodyAction,
  FileManagerAction,
  ReqBodyList
} from 'ngx-filemanager-core/public_api';
import { GetSubList } from './storage-helpers';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('Test list some files', async () => {
  const response = await GetSubList(testBucket, '/');
  console.log(JSON.stringify(response, null, 2));
});
