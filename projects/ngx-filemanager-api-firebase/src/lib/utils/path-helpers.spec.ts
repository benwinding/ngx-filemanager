import {
  EnsureTrailingSlash,
  GetRelativePath,
  IsCurrentPath,
  GetSubDirectory,
  IsCurrentPathFile
} from './path-helpers';

// EnsureTrailingSlash

test('must handle root', () => {
  const result = EnsureTrailingSlash('/');
  return expect(result).toBe('/');
});

test('test for no path', () => {
  const result = EnsureTrailingSlash('');
  return expect(result).toBe('/');
});

test('test for multiple paths', () => {
  const result = EnsureTrailingSlash('/abc/assaca/acsasc');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

test('', () => {
  const result = EnsureTrailingSlash('/abc/assaca/acsasc/');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

// GetRelativePath

test('', () => {
  const result = GetRelativePath('/cwd/', '/cwd/file');
  return expect(result).toBe('file');
});

test('', () => {
  const result = GetRelativePath('/cwd/', '/cwd/file/okthere');
  return expect(result).toBe('file/okthere');
});

test('', () => {
  const result = GetRelativePath('/', '/file/okthere');
  return expect(result).toBe('file/okthere');
});

// IsCurrentPath

test('', () => {
  const result = IsCurrentPath('/cwd', '/cwd');
  return expect(result).toBe(true);
});

test('', () => {
  const result = IsCurrentPath('/cwd/', '/cwd/');
  return expect(result).toBe(true);
});

test('', () => {
  const result = IsCurrentPath('/cwd/', '/cwd/file');
  return expect(result).toBe(false);
});

// IsCurrentPathFile

test('', () => {
  const result = IsCurrentPathFile('/cwd/', '/cwd/file');
  return expect(result).toBe(true);
});

test('', () => {
  const result = IsCurrentPathFile('/cwd/', '/cwd/sub/file');
  return expect(result).toBe(false);
});

// GetSubDirectory

test('', () => {
  const result = GetSubDirectory('/cwd/', '/cwd/sub/file');
  return expect(result).toBe('sub');
});

test('', () => {
  const result = GetSubDirectory('/cwd/', '/cwd/sub/file');
  return expect(result).toBe('sub');
});
