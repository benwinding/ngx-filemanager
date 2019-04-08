export function HasPrefixSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasPrefix = inputPath.slice(0) === '/';
  return hasPrefix;
}

export function HasTrailingSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasTrailing = inputPath.slice(-1) === '/';
  return hasTrailing;
}

export function EnsureTrailingSlash(inputPath: string): string {
  const hasTrailing = HasTrailingSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath : inputPath + '/';
  return pathParsed;
}

export function EnsureNoPrefixSlash(inputPath: string): string {
  const hasPrefix = HasPrefixSlash(inputPath);
  const pathParsed = hasPrefix ? inputPath.slice(1) : inputPath;
  return pathParsed;
}

export function GetRelativePath(
  currentDirectoryPath: string,
  absObjectPath: string
): string {
  const relativePath = absObjectPath.slice(currentDirectoryPath.length);
  return relativePath;
}

export function IsCurrentPath(
  currentDirectoryPath: string,
  absObjectPath: string
): boolean {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const isCurrentDir = !relativePath;
  return isCurrentDir;
}

export function IsCurrentPathFile(
  currentDirectoryPath: string,
  absObjectPath: string
): boolean {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const slashSegments = relativePath.split('/');
  const isCurrentPathFile = slashSegments.length < 2;
  return isCurrentPathFile;
}

export function GetSubDirectory(
  currentDirectoryPath: string,
  absObjectPath: string
): string {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const slashSegments = relativePath.split('/');
  const subDirectory = slashSegments.shift();
  return subDirectory;
}
