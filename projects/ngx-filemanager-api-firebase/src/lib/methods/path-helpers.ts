export function EnsureTrailingSlash(inputPath: string): string {
  const hasTrailing = inputPath.slice(-1) === '/';
  const pathParsed = hasTrailing ? inputPath : inputPath + '/';
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
