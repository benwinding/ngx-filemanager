import { paths } from './paths';

// EnsureTrailingSlash

test('must handle root', () => {
  const result = paths.EnsureTrailingSlash('/');
  return expect(result).toBe('/');
});

test('test for no path', () => {
  const result = paths.EnsureTrailingSlash('');
  return expect(result).toBe('/');
});

test('test for multiple paths', () => {
  const result = paths.EnsureTrailingSlash('/abc/assaca/acsasc');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

test('', () => {
  const result = paths.EnsureTrailingSlash('/abc/assaca/acsasc/');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

// GetRelativePath

test('', () => {
  const result = paths.GetRelativePath('/cwd/', '/cwd/file');
  return expect(result).toBe('file');
});

test('', () => {
  const result = paths.GetRelativePath('/cwd/', '/cwd/file/okthere');
  return expect(result).toBe('file/okthere');
});

test('', () => {
  const result = paths.GetRelativePath('/', '/file/okthere');
  return expect(result).toBe('file/okthere');
});

// IsCurrentPath

test('', () => {
  const result = paths.IsCurrentPath('/cwd', '/cwd');
  return expect(result).toBe(true);
});

test('', () => {
  const result = paths.IsCurrentPath('/cwd/', '/cwd/');
  return expect(result).toBe(true);
});

test('', () => {
  const result = paths.IsCurrentPath('/cwd/', '/cwd/file');
  return expect(result).toBe(false);
});

// IsCurrentPathFile

test('', () => {
  const result = paths.IsCurrentPathFile('/cwd/', '/cwd/file');
  return expect(result).toBe(true);
});

test('', () => {
  const result = paths.IsCurrentPathFile('/cwd/', '/cwd/sub/file');
  return expect(result).toBe(false);
});

// GetSubDirectory

test('', () => {
  const result = paths.GetSubDirectory('/cwd/', '/cwd/sub/file');
  return expect(result).toBe('sub');
});

test('', () => {
  const result = paths.GetSubDirectory('/cwd/', '/cwd/sub/file');
  return expect(result).toBe('sub');
});
