export function HasPrefixSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasPrefix = inputPath.slice(0) === '/';
  return hasPrefix;
}

export function EnsurePrefixSlash(inputPath: string): string {
  const hasTrailing = HasPrefixSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath : '/' + inputPath;
  return pathParsed;
}
