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
  const parsed = EnsurePrefixSlash(currentDirectoryPath);
  const parentPath = path.dirname(parsed);
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

function IsObjNameDir(storageObjectName: string) {
  const filePathParsed = EnsurePrefixSlash(storageObjectName);
  const isDir = HasTrailingSlash(filePathParsed);
  return isDir;
}

function IsObjNameFile(storageObjectName: string) {
  return !IsObjNameDir(storageObjectName);
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

function Add2ToPathDir(inputPath: string): string {
  const pathWithoutSlash = EnsureNoTrailingSlash(inputPath);
  const pathWith2 = pathWithoutSlash + ' (2)';
  const newDirName =  EnsureTrailingSlash(pathWith2);
  return newDirName;
}

function GetFileNameWithExtension(inputPath: string): string {
  const fileNameWithExt = inputPath.split('/').pop();
  return fileNameWithExt;
}

function GetFileNameWithoutExtension(inputPath: string): string {
  const fileNameWithExt = GetFileNameWithExtension(inputPath);
  const segments = fileNameWithExt.split('.');
  segments.pop(); // remove extension
  return segments.join('.');
}

function GetPathUpToLastBracket(inputPath: string): string {
  const slashes = inputPath.split('/');
  slashes.pop();
  const dirPath = slashes.join('/');
  const fileName = inputPath.slice(dirPath.length);
  const bracketSegments = fileName.split('(');
  bracketSegments.pop();
  const fileNameWith = bracketSegments.join('(');
  if (fileName.includes('(')) {
    const filepathWithBracket = path.join(dirPath, fileNameWith + '(');
    return filepathWithBracket;
  }
  const dotSegments = inputPath.split('.');
  if (dotSegments.length < 2) {
    return inputPath;
  }
  dotSegments.pop();
  return dotSegments.join('.');
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
  IsObjNameDir,
  IsObjNameFile,
  GetSubDirectory,
  GetParentDir,
  GetFileNameWithExtension,
  GetFileNameWithoutExtension,
  GetPathUpToLastBracket,
  Add2ToPath,
  Add2ToPathDir
};
