"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_helpers_1 = require("../../utils/path-helpers");
var translation_helpers_1 = require("../../utils/translation-helpers");
var permissions_helper_1 = require("../../utils/permissions-helper");
var UserAccessResult_1 = require("../../types/UserAccessResult");
var verror_1 = require("verror");
function MakeOptionsListRoot() {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        autoPaginate: false
    };
}
exports.MakeOptionsListRoot = MakeOptionsListRoot;
function MakeOptionsList(inputDirectoryPath) {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        directory: inputDirectoryPath,
        autoPaginate: false
    };
}
exports.MakeOptionsList = MakeOptionsList;
function GetFilesAndPrefixes(bucket, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var callback = function (err, files, nextQuery, apiResponse) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        var prefixes = apiResponse['prefixes'] || [];
                        var result = {
                            files: files || [],
                            prefixes: prefixes
                        };
                        resolve(result);
                    };
                    bucket.getFiles(options, callback);
                })];
        });
    });
}
exports.GetFilesAndPrefixes = GetFilesAndPrefixes;
function GetFiles(bucket, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result, storageObjects, files, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bucket.getFiles(options)];
                case 1:
                    result = _a.sent();
                    storageObjects = result[0];
                    files = storageObjects.map(function (o) { return translation_helpers_1.translateRawStorage(o); });
                    return [2 /*return*/, files];
                case 2:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.GetFiles = GetFiles;
function GetListFromStorage(bucket, inputDirectoryPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var googleStorageDirPath, isRootPath, options, result, allObjects, allObjectsPathsSet_1, phantomPrefixes, newPhantomFolders, combinedList, filesWithoutCurrentDirectory, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    googleStorageDirPath = path_helpers_1.EnsureGoogleStoragePathDir(inputDirectoryPath);
                    isRootPath = googleStorageDirPath === '/' || '';
                    if (isRootPath) {
                        options = MakeOptionsListRoot();
                    }
                    else {
                        options = MakeOptionsList(googleStorageDirPath);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, GetFilesAndPrefixes(bucket, options)];
                case 2:
                    result = _a.sent();
                    allObjects = result.files.map(function (o) { return translation_helpers_1.translateRawStorage(o); });
                    allObjectsPathsSet_1 = new Set(allObjects.map(function (f) { return f.ref.name; }));
                    phantomPrefixes = result.prefixes.filter(function (prefix) { return !allObjectsPathsSet_1.has(prefix); });
                    newPhantomFolders = phantomPrefixes.map(function (phantomPath) {
                        return translation_helpers_1.makePhantomStorageFolder(phantomPath);
                    });
                    combinedList = allObjects.concat(newPhantomFolders);
                    filesWithoutCurrentDirectory = combinedList.filter(function (f) { return path_helpers_1.EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath; });
                    return [2 /*return*/, filesWithoutCurrentDirectory];
                case 3:
                    error_2 = _a.sent();
                    throw new verror_1.VError(error_2);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetListFromStorage = GetListFromStorage;
function GetList(bucket, inputDirectoryPath, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var files, resFiles, filesAllowed, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, GetListFromStorage(bucket, inputDirectoryPath)];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (f) { return translation_helpers_1.translateStorageToResFile(f); }))];
                case 2:
                    resFiles = _a.sent();
                    filesAllowed = resFiles.filter(function (f) {
                        var perms = permissions_helper_1.GetPermissionForFile(f.permissions, claims);
                        var minPerms = UserAccessResult_1.UserAccessResult.r__;
                        return perms > minPerms;
                    });
                    return [2 /*return*/, filesAllowed];
                case 3:
                    error_3 = _a.sent();
                    throw new verror_1.VError(error_3);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetList = GetList;
//# sourceMappingURL=list.js.map