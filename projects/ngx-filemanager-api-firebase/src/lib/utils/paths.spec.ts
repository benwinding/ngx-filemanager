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

test('EnsureTrailingSlash, test for multiple paths', () => {
  const result = paths.EnsureTrailingSlash('/abc/assaca/acsasc');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

test('EnsureTrailingSlash 2', () => {
  const result = paths.EnsureTrailingSlash('/abc/assaca/acsasc/');
  return expect(result).toBe('/abc/assaca/acsasc/');
});

// GetRelativePath

test('GetRelativePath 1', () => {
  const result = paths.GetRelativePath('/cwd/', '/cwd/file');
  return expect(result).toBe('file');
});

test('GetRelativePath 2', () => {
  const result = paths.GetRelativePath('/cwd/', '/cwd/file/okthere');
  return expect(result).toBe('file/okthere');
});

test('GetRelativePath 3', () => {
  const result = paths.GetRelativePath('/', '/file/okthere');
  return expect(result).toBe('file/okthere');
});

// IsCurrentPath

test('IsCurrentPath 1', () => {
  const result = paths.IsCurrentPath('/cwd', '/cwd');
  return expect(result).toBe(true);
});

test('IsCurrentPath 2', () => {
  const result = paths.IsCurrentPath('/cwd/', '/cwd/');
  return expect(result).toBe(true);
});

test('IsCurrentPath 3', () => {
  const result = paths.IsCurrentPath('/cwd/', '/cwd/file');
  return expect(result).toBe(false);
});

// IsCurrentPathFile

test('IsCurrentPathFile 1', () => {
  const result = paths.IsCurrentPathFile('/cwd/', '/cwd/file');
  return expect(result).toBe(true);
});

test('IsCurrentPathFile 2', () => {
  const result = paths.IsCurrentPathFile('/cwd/', '/cwd/sub/file');
  return expect(result).toBe(false);
});

// GetSubDirectory

test('GetSubDirectory 1', () => {
  const result = paths.GetSubDirectory('/cwd/', '/cwd/sub/file');
  return expect(result).toBe('sub');
});

test('GetSubDirectory 2', () => {
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

test('EnsureGoogleStoragePathDir 1', () => {
  const result = paths.EnsureGoogleStoragePathDir('/root/dir');
  return expect(result).toBe('root/dir/');
});

test('EnsureGoogleStoragePathDir 2', () => {
  const result = paths.EnsureGoogleStoragePathDir('/root/dir/');
  return expect(result).toBe('root/dir/');
});

test('EnsureGoogleStoragePathDir 3', () => {
  const result = paths.EnsureGoogleStoragePathDir('root/dir');
  return expect(result).toBe('root/dir/');
});

// GetParent

test('must handle root', () => {
  const result = paths.GetParentDir('/');
  return expect(result).toBe('');
});

test('must handle sub dir', () => {
  const result = paths.GetParentDir('/cascasc');
  return expect(result).toBe('');
});

test('must handle sub dir', () => {
  const result = paths.GetParentDir('/sub/casasc');
  return expect(result).toBe('sub/');
});

test('must handle sub dir', () => {
  const result = paths.GetParentDir('sub/');
  return expect(result).toBe('');
});

test('adds (2) to file', () => {
  const result = paths.Add2ToPath('sub/file.txt');
  return expect(result).toBe('sub/file (2).txt');
});

test('adds (2) to file (2)', () => {
  const result = paths.Add2ToPath('sub/file (2).txt');
  return expect(result).toBe('sub/file (2) (2).txt');
});

test('adds (2) to directory', () => {
  const result = paths.Add2ToPathDir('sub/dir/');
  return expect(result).toBe('sub/dir (2)/');
});

test('adds (2) to directory (2)', () => {
  const result = paths.Add2ToPathDir('sub/dir (2)/');
  return expect(result).toBe('sub/dir (2) (2)/');
});

