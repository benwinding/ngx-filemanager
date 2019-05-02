import * as uuid from 'uuid/v4';
import {
  TryChangeSingleFilePermissions,
  SetPermissionToObj
} from './changePermissions';
import { testHelper } from '../../utils/test-helper';
import { perms } from '../../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { TryChangeSingleFilePermissionsObject } from './changePermissionsObject';

const testBucket = testHelper.testBucket;

test('set permissions with claims in group', async () => {
  const file1 = testBucket.file('changePermissionsObject.spec.ts/test1/file1.txt');
  const blankPerms: CoreTypes.FilePermissionsObject = {
    writers: ['12345'],
    readers: [],
    others: 'hidden'
  };
  await testHelper.uploadTestFileWithPerms(file1, blankPerms);

  const testClaims = perms.factory.blankUserClaim();
  testClaims.groups = ['12345'];

  const newPerms: CoreTypes.FilePermissionsObject = {
    writers: ['12345'],
    readers: [],
    others: 'hidden'
  };

  const shouldNotThrow = async () => {
    return TryChangeSingleFilePermissionsObject(
      file1,
      newPerms,
      testClaims
    );
  };
  await expect(shouldNotThrow()).resolves.not.toThrowError();
  await testHelper.removeFile(testBucket, file1.name);
}, 60000);
