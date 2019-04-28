import { PermissionsUnixToOctal, CheckUnixOctal } from './unix-conversion';

test('PermissionsStringToOctal ---', () => {
  const result = PermissionsUnixToOctal('---');
  expect(result).toBe('0');
});

test('PermissionsStringToOctal ---', () => {
  const result = PermissionsUnixToOctal('--x');
  expect(result).toBe('1');
});

test('CheckUnixOctal read', () => {
  expect(CheckUnixOctal('0', 'read')).toBe(false);
  expect(CheckUnixOctal('1', 'read')).toBe(false);
  expect(CheckUnixOctal('2', 'read')).toBe(false);
  expect(CheckUnixOctal('3', 'read')).toBe(false);
  expect(CheckUnixOctal('4', 'read')).toBe(true);
  expect(CheckUnixOctal('5', 'read')).toBe(true);
  expect(CheckUnixOctal('6', 'read')).toBe(true);
  expect(CheckUnixOctal('7', 'read')).toBe(true);
});

test('CheckUnixOctal write', () => {
  expect(CheckUnixOctal('0', 'write')).toBe(false);
  expect(CheckUnixOctal('1', 'write')).toBe(false);
  expect(CheckUnixOctal('2', 'write')).toBe(true);
  expect(CheckUnixOctal('3', 'write')).toBe(true);
  expect(CheckUnixOctal('4', 'write')).toBe(false);
  expect(CheckUnixOctal('5', 'write')).toBe(false);
  expect(CheckUnixOctal('6', 'write')).toBe(true);
  expect(CheckUnixOctal('7', 'write')).toBe(true);
});

test('CheckUnixOctal execute', () => {
  expect(CheckUnixOctal('0', 'execute')).toBe(false);
  expect(CheckUnixOctal('1', 'execute')).toBe(true);
  expect(CheckUnixOctal('2', 'execute')).toBe(false);
  expect(CheckUnixOctal('3', 'execute')).toBe(true);
  expect(CheckUnixOctal('4', 'execute')).toBe(false);
  expect(CheckUnixOctal('5', 'execute')).toBe(true);
  expect(CheckUnixOctal('6', 'execute')).toBe(false);
  expect(CheckUnixOctal('7', 'execute')).toBe(true);
});
