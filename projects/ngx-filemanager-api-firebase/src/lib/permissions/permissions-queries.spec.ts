import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { permsFactory } from './permissions.factory';
import { permsQueries } from './permissions-queries';
import { testHelper } from '../utils/test-helper';

const testBucket = testHelper.testBucket;

test('test permsQueries.IsPartOfArray users', () => {
  const permissions = permsFactory.blankPermissionsObj();
  const entity: CoreTypes.PermissionEntity = {
    name: 'Dan',
    id: 'aocji898ac9asc',
  };
  permissions.users.push(entity);
  const users = ['ascascasc'];
  const isInArray = permsQueries.IsPartOfArray(permissions.users, users);
  expect(isInArray).toBe(false);
});

test('test permsQueries.IsPartOfArray', () => {
  const permissions = permsFactory.blankPermissionsObj();
  const entity: CoreTypes.PermissionEntity = {
    name: 'Dan',
    id: 'aocji898ac9asc',
  };
  permissions.users.push(entity);
  const users = ['aocji898ac9asc'];
  const isInArray = permsQueries.IsPartOfArray(permissions.users, users);
  expect(isInArray).toBe(true);
});

test('get permissions obj to object storage', async () => {
  const file = testBucket.file(
    'permissions-helper.spec.ts/blankPermissions.txt'
  );
  const permissions = await permsQueries.RetrieveFilePermissions(file);
  console.log('perms', {permissions});
  expect(permissions.unix).toBe('777');
});

test('TryCheckHasAnyPermissions', () => {
  const shouldError = () => {
    const blankClaims = permsFactory.blankUserClaim();
    permsQueries.TryCheckHasAnyPermissions(blankClaims);
  };
  expect(shouldError).toThrowError();

  const shouldNotError = () => {
    const claims = permsFactory.blankUserClaim();
    claims.groups.push('ascascasc');
    return permsQueries.TryCheckHasAnyPermissions(claims);
  };
  expect(shouldNotError).not.toThrowError();
});
