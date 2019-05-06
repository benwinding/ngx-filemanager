export function HasPrefixSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasPrefix = inputPath.startsWith('/');
  return hasPrefix;
}

export function HasTrailingSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasPrefix = inputPath.endsWith('/');
  return hasPrefix;
}

export function EnsurePrefixSlash(inputPath: string): string {
  const hasPrefix = HasPrefixSlash(inputPath);
  const pathParsed = hasPrefix ? inputPath : '/' + inputPath;
  return pathParsed;
}

export function EnsureTrailingSlash(inputPath: string): string {
  const hasTrailing = HasTrailingSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath : inputPath + '/';
  return pathParsed;
}

export function EnsureAbsoluteDirectory(inputPath: string): string {
  const pathParsed = EnsureTrailingSlash(EnsurePrefixSlash(inputPath));
  return pathParsed;
}

function EnsureNoTrailingSlash(inputPath: string): string {
  const hasTrailing = HasTrailingSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
  return pathParsed;
}

export function Add2ToPath(inputPath: string): string {
  const dotSegments = inputPath.split('.');
  const extension = dotSegments.pop();
  const fileName = dotSegments.join('.') + ' (2)' + '.' + extension;
  return fileName;
}

export function Add2ToPathDir(inputPath: string): string {
  const pathWithoutSlash = EnsureNoTrailingSlash(inputPath);
  const pathWith2 = pathWithoutSlash + ' (2)';
  const newDirName =  EnsureTrailingSlash(pathWith2);
  return newDirName;
}
