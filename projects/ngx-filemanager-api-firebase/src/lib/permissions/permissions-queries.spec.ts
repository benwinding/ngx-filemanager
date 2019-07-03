import { permsFactory } from './permissions.factory';
import { permsQueries } from './permissions-queries';
import { testHelper } from '../utils/test-helper';

test('check not part of array permsQueries.IsPartOfArray', () => {
  const isInArray = permsQueries.IsPartOfArray(['ascascasc'], ['sssss']);
  expect(isInArray).toBe(false);
});

test('test permsQueries.IsPartOfArray', () => {
  const isInArray = permsQueries.IsPartOfArray(['sssss'], ['sssss']);
  expect(isInArray).toBe(true);
});

test('test default file permissions when uploaded', async () => {
  const testBucket = testHelper.getBucket();
  const file = testBucket.file(
    'permissions-helper.spec.ts/blankPermissions.txt'
  );
  const permissions = await permsQueries.RetrieveFilePermissions(file);
  console.log('perms', { permissions });
  expect(permissions.others).toBe('read/write');
});

test('TryCheckHasAnyPermissions', () => {
  const shouldError = () => {
    const blankClaims = permsFactory.blankUserClaim();
    permsQueries.TryCheckHasAnyPermissions(blankClaims);
  };
  expect(shouldError).toThrowError();
});

test('TryCheckHasAnyPermissions', () => {
  const shouldNotError = () => {
    const claims = permsFactory.blankUserClaim();
    claims.groups.push('ascascasc');
    return permsQueries.TryCheckHasAnyPermissions(claims);
  };
  expect(shouldNotError).not.toThrowError();
});
