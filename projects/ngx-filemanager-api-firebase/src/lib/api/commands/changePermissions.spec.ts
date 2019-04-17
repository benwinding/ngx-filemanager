import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import {
  TryChangeSingleFilePermissions,
  SetPermissionToObj
} from './changePermissions';
import { PermissionEntity, PermissionsObject } from 'ngx-filemanager-core';
import { testHelper } from '../../utils/test-helper';
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

test('set permissions to object', async () => {
  const oldPermissions = testHelper.blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: uuid(),
    type: 'user'
  };
  const newPermissions = SetPermissionToObj(oldPermissions, 'READER', entity);
  expect(newPermissions.readers.length).toBe(1);
});

test('TryChangeSingleFilePermissions', async () => {
  const file = testBucket.file(
    'changePermissions/TryChangeSingleFilePermissions.txt'
  );
  await testHelper.uploadTestFile(file);
  const entity: PermissionEntity = {
    name: 'Dan',
    id: '12124214',
    type: 'user'
  };
  await TryChangeSingleFilePermissions(file, 'READER', entity);
  const permissions: PermissionsObject = await testHelper.RetrieveFilePermissions(
    file
  );
  const hasEntityInStorage = permissions.readers.find(u => u.id === entity.id);
  // logObj({permissions});
  expect(hasEntityInStorage).toBeTruthy();
  await testHelper.removeFile(testBucket, file.name);
});
