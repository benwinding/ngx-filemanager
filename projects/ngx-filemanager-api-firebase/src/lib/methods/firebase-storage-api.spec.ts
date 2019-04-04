import * as admin from 'firebase-admin';
import { NgxFileMangerApiFireBaseClass } from './firebase-storage-api';
import {
  ReqBodyAction,
  FileManagerAction,
  ReqBodyList
} from 'ngx-filemanager-core/public_api';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testMethods = new NgxFileMangerApiFireBaseClass(testStorage);

function makeBaseRequest(action: FileManagerAction): ReqBodyAction {
  return {
    bucketname: testbucketname,
    action: action
  };
}

function makeList(path: string): ReqBodyList {
  return { ...makeBaseRequest('list'), path: path };
}

test('Test list some files', async () => {
  const testListBody = makeList('/test-list-files/');
  const response = await testMethods.HandleList(testListBody);
  console.log(JSON.stringify(response, null, 2));
});
