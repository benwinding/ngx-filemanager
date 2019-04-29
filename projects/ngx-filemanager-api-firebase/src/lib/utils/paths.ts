import * as path from 'path';

function HasPrefixSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasPrefix = inputPath.startsWith('/');
  return hasPrefix;
}

function HasTrailingSlash(inputPath: string): boolean {
  if (!inputPath || !inputPath.length) {
    return false;
  }
  const hasTrailing = inputPath.endsWith('/');
  return hasTrailing;
}

function EnsureTrailingSlash(inputPath: string): string {
  if (!inputPath) {
    return '/';
  }
  const hasTrailing = HasTrailingSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath : inputPath + '/';
  return pathParsed;
}

function EnsureNoPrefixSlash(inputPath: string): string {
  const hasPrefix = HasPrefixSlash(inputPath);
  const pathParsed = hasPrefix ? inputPath.slice(1) : inputPath;
  return pathParsed;
}

function EnsurePrefixSlash(inputPath: string): string {
  if (!inputPath) {
    return '/';
  }
  const hasPrefix = HasPrefixSlash(inputPath);
  const pathParsed = hasPrefix ? inputPath : '/' + inputPath;
  return pathParsed;
}

function EnsureNoTrailingSlash(inputPath: string): string {
  const hasTrailing = HasTrailingSlash(inputPath);
  const pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
  return pathParsed;
}

function EnsureAbsolutePathFile(filePath: string) {
  return EnsurePrefixSlash(EnsureNoTrailingSlash(filePath));
}

function EnsureAbsolutePathDir(folderPath: string) {
  return EnsurePrefixSlash(EnsureTrailingSlash(folderPath));
}

function EnsureGoogleStoragePathDir(folderPath: string) {
  return EnsureNoPrefixSlash(EnsureTrailingSlash(folderPath));
}

function EnsureGoogleStoragePathFile(filePath: string) {
  return EnsureNoPrefixSlash(EnsureNoTrailingSlash(filePath));
}

function GetRelativePath(
  currentDirectoryPath: string,
  absObjectPath: string
): string {
  const relativePath = absObjectPath.slice(currentDirectoryPath.length);
  return relativePath;
}

function GetParentDir(currentDirectoryPath: string): string {
  const parentPath = path.dirname(currentDirectoryPath);
  return EnsureGoogleStoragePathDir(parentPath);
}

function IsCurrentPath(
  currentDirectoryPath: string,
  absObjectPath: string
): boolean {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const isCurrentDir = !relativePath;
  return isCurrentDir;
}

function IsCurrentPathFile(
  currentDirectoryPath: string,
  absObjectPath: string
): boolean {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const slashSegments = relativePath.split('/');
  const isCurrentPathFile = slashSegments.length < 2;
  return isCurrentPathFile;
}

function GetSubDirectory(
  currentDirectoryPath: string,
  absObjectPath: string
): string {
  const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
  const slashSegments = relativePath.split('/');
  const subDirectory = slashSegments.shift();
  return subDirectory;
}

function Add2ToPath(inputPath: string): string {
  const dotSegments = inputPath.split('.');
  const extension = dotSegments.pop();
  const fileName = dotSegments.join('.') + ' (2)' + '.' + extension;
  return fileName;
}

export const paths = {
  HasPrefixSlash,
  HasTrailingSlash,
  EnsureTrailingSlash,
  EnsureNoPrefixSlash,
  EnsurePrefixSlash,
  EnsureNoTrailingSlash,
  EnsureAbsolutePathFile,
  EnsureAbsolutePathDir,
  EnsureGoogleStoragePathDir,
  EnsureGoogleStoragePathFile,
  GetRelativePath,
  IsCurrentPath,
  IsCurrentPathFile,
  GetSubDirectory,
  GetParentDir,
  Add2ToPath,
};
