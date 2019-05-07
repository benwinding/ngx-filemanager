import { crumbFactory } from './crumb-factory';

export function logObj(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

it('should not be able to escape virtual root', () => {
  const virtualRoot = '/sssss';
  const testPath = '/';
  const tryThis = () => {
    crumbFactory.MakeCrumbs(virtualRoot, testPath);
  };
  expect(tryThis).toThrowError();
});

it('should have single folder as root', () => {
  const virtualRoot = '/';
  const testPath = '/';
  const crumbs = crumbFactory.MakeCrumbs(virtualRoot, testPath);
  expect(crumbs.length).toBe(1);
});

it('should have single folder as root', () => {
  const virtualRoot = '/subfolder';
  const testPath = '/subfolder';
  const crumbs = crumbFactory.MakeCrumbs(virtualRoot, testPath);
  expect(crumbs.length).toBe(1);
});

it('should have 2 crumbs', () => {
  const virtualRoot = '/subfolder';
  const testPath = '/subfolder/sub1';
  const crumbs = crumbFactory.MakeCrumbs(virtualRoot, testPath);
  logObj(crumbs);
  expect(crumbs.length).toBe(2);
});

it('should have many crumbs', () => {
  const virtualRoot = '/subfolder';
  const testPath = '/subfolder/sub1/sub2/sub3';
  const crumbs = crumbFactory.MakeCrumbs(virtualRoot, testPath);
  logObj(crumbs);
  expect(crumbs.length).toBe(4);
});
