import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v1';
import {
  TryChangeSingleFilePermissions,
  SetPermissionToObj
} from './changePermissions';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { CoreTypes } from 'ngx-filemanager-core';

test('set permissions to object', async () => {
  const oldPermissions = perms.factory.blankPermissionsObj();
  const entity: CoreTypes.PermissionEntity = {
    name: 'Dan',
    id: uuid()
  };
  const newPermissions = SetPermissionToObj(oldPermissions, 'READER', entity);
  expect(newPermissions.groups).toBeTruthy();
});

