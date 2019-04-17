import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import {
  TryChangeSingleFilePermissions,
  SetPermissionToObj,
  blankPermissionsObj
} from './changePermissions';
import {
  PermissionEntity,
  PermissionsObject
} from 'ngx-filemanager-core';
import { RetrieveFilePermissions } from '../../utils/permissions-helper';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('set permissions to object', async () => {
  // const file = testBucket.file('changePermissions/blankPermissions.txt');
  const oldPermissions = blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: uuid(),
    type: 'user'
  };
  const newPermissions = SetPermissionToObj(oldPermissions, 'READER', entity);
  expect(newPermissions.readers.length).toBe(1);
});

test('TryChangeSingleFilePermissions', async () => {
  const file = testBucket.file('changePermissions/blankPermissions.txt');
  const entity: PermissionEntity = {
    name: 'Dan',
    id: uuid(),
    type: 'user'
  };
  await TryChangeSingleFilePermissions(file, 'READER', entity);
  const permissions: PermissionsObject = await RetrieveFilePermissions(file);
  const hasEntityInStorage = permissions.readers.find(u => u.id === entity.id);
  expect(hasEntityInStorage).toBeTruthy();
});
