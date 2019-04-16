import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import { TryChangeSingleFilePermissions } from './changePermissions';
import { PermissionEntity, PermissionsObject } from 'ngx-filemanager-core/public_api';
import { GetMetaProperty } from '../storage-helper';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('get permissions obj from storage', async () => {
  const file = testBucket.file('changePermissions/blankPermissions.txt');
  const entity: PermissionEntity = {
    name: 'Dan',
    id: uuid(),
    type: 'user'
  };
  await TryChangeSingleFilePermissions(file, 'READER', entity);
  const permissions: PermissionsObject = await GetMetaProperty(file, 'permissions');
  const hasEntityInStorage = permissions.readers.find(u => u.id === entity.id);
  expect(hasEntityInStorage).toBeTruthy();
});
