"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HasPrefixSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    var hasPrefix = inputPath.startsWith('/');
    return hasPrefix;
}
exports.HasPrefixSlash = HasPrefixSlash;
function HasTrailingSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    var hasTrailing = inputPath.endsWith('/');
    return hasTrailing;
}
exports.HasTrailingSlash = HasTrailingSlash;
function EnsureTrailingSlash(inputPath) {
    if (!inputPath) {
        return '/';
    }
    var hasTrailing = HasTrailingSlash(inputPath);
    var pathParsed = hasTrailing ? inputPath : inputPath + '/';
    return pathParsed;
}
exports.EnsureTrailingSlash = EnsureTrailingSlash;
function EnsureNoPrefixSlash(inputPath) {
    var hasPrefix = HasPrefixSlash(inputPath);
    var pathParsed = hasPrefix ? inputPath.slice(1) : inputPath;
    return pathParsed;
}
exports.EnsureNoPrefixSlash = EnsureNoPrefixSlash;
function EnsurePrefixSlash(inputPath) {
    if (!inputPath) {
        return '/';
    }
    var hasPrefix = HasPrefixSlash(inputPath);
    var pathParsed = hasPrefix ? inputPath : '/' + inputPath;
    return pathParsed;
}
exports.EnsurePrefixSlash = EnsurePrefixSlash;
function EnsureNoTrailingSlash(inputPath) {
    var hasTrailing = HasTrailingSlash(inputPath);
    var pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
    return pathParsed;
}
exports.EnsureNoTrailingSlash = EnsureNoTrailingSlash;
function EnsureAbsolutePathFile(filePath) {
    return EnsurePrefixSlash(EnsureNoTrailingSlash(filePath));
}
exports.EnsureAbsolutePathFile = EnsureAbsolutePathFile;
function EnsureAbsolutePathDir(folderPath) {
    return EnsurePrefixSlash(EnsureTrailingSlash(folderPath));
}
exports.EnsureAbsolutePathDir = EnsureAbsolutePathDir;
function EnsureGoogleStoragePathDir(folderPath) {
    return EnsureNoPrefixSlash(EnsureTrailingSlash(folderPath));
}
exports.EnsureGoogleStoragePathDir = EnsureGoogleStoragePathDir;
function EnsureGoogleStoragePathFile(filePath) {
    return EnsureNoPrefixSlash(EnsureNoTrailingSlash(filePath));
}
exports.EnsureGoogleStoragePathFile = EnsureGoogleStoragePathFile;
function GetRelativePath(currentDirectoryPath, absObjectPath) {
    var relativePath = absObjectPath.slice(currentDirectoryPath.length);
    return relativePath;
}
exports.GetRelativePath = GetRelativePath;
function IsCurrentPath(currentDirectoryPath, absObjectPath) {
    var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    var isCurrentDir = !relativePath;
    return isCurrentDir;
}
exports.IsCurrentPath = IsCurrentPath;
function IsCurrentPathFile(currentDirectoryPath, absObjectPath) {
    var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    var slashSegments = relativePath.split('/');
    var isCurrentPathFile = slashSegments.length < 2;
    return isCurrentPathFile;
}
exports.IsCurrentPathFile = IsCurrentPathFile;
function GetSubDirectory(currentDirectoryPath, absObjectPath) {
    var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    var slashSegments = relativePath.split('/');
    var subDirectory = slashSegments.shift();
    return subDirectory;
}
exports.GetSubDirectory = GetSubDirectory;
//# sourceMappingURL=path-helpers.js.map