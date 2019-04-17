import * as admin from 'firebase-admin';
import { RetrieveFilePermissions, IsPartOfArray } from './permissions-helper';
import { testHelper } from './test-helper';
import { PermissionEntity } from 'ngx-filemanager-core/public_api';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);



test('test IsPartOfArray', () => {
  const permissions = testHelper.blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: 'aocji898ac9asc',
    type: 'user'
  };
  permissions.owners.push(entity);
  const groupSet = new Set(['ascascasc']);
  const isInArray = IsPartOfArray(permissions.owners, groupSet);
  expect(isInArray).toBe(false);
});

test('test IsPartOfArray', () => {
  const permissions = testHelper.blankPermissionsObj();
  const entity: PermissionEntity = {
    name: 'Dan',
    id: 'aocji898ac9asc',
    type: 'user'
  };
  permissions.owners.push(entity);
  const groupSet = new Set(['aocji898ac9asc']);
  const isInArray = IsPartOfArray(permissions.owners, groupSet);
  expect(isInArray).toBe(true);
});

test('get permissions obj to object storage', async () => {
  const file = testBucket.file('permissions-helper.spec.ts/blankPermissions.txt');
  const permissions = await RetrieveFilePermissions(file);
  const isEmpty = Object.entries(permissions).length < 1;
  expect(isEmpty).toBe(true);
});

test('update custom meta property', async () => {
  const file = testBucket.file('permissions-helper.spec.ts/blankPermissions.txt');
  const permissions = await RetrieveFilePermissions(file);
  const isEmpty = Object.entries(permissions).length < 1;
  expect(isEmpty).toBe(true);
});
