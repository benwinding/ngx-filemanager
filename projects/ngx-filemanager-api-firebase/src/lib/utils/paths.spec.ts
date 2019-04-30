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

test('should find upto bracket 1', () => {
  const result = paths.GetPathUpToLastBracket('/cwd/file (');
  return expect(result).toBe('/cwd/file (');
});

test('should find upto bracket 2', () => {
  const result = paths.GetPathUpToLastBracket('/cwd/file (1) (114214) (');
  return expect(result).toBe('/cwd/file (1) (114214) (');
});

test('should find upto bracket 3', () => {
  const result = paths.GetPathUpToLastBracket('/cwd (1)/file (');
  return expect(result).toBe('/cwd (1)/file (');
});

test('should find upto bracket 4', () => {
  const result = paths.GetPathUpToLastBracket('/cwd (1)/file as a');
  return expect(result).toBe('/cwd (1)/file as a');
});

test('should find upto bracket 5', () => {
  const result = paths.GetPathUpToLastBracket('/cwd (1)/file.txt');
  return expect(result).toBe('/cwd (1)/file');
});
