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
