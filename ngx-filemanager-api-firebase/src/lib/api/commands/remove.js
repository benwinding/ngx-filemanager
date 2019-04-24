"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_helpers_1 = require("../../utils/path-helpers");
var storage_helper_1 = require("../../utils/storage-helper");
var verror_1 = require("verror");
function tryDeleteFile(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exists, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, file.exists()];
                case 1:
                    exists = (_a.sent())[0];
                    if (!exists) return [3 /*break*/, 3];
                    console.log('- deleting file: ', file.name);
                    return [4 /*yield*/, file.delete()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: return [2 /*return*/, false];
                case 4:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.tryDeleteFile = tryDeleteFile;
function RemoveFileWithChildren(bucket, itemPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var allChildren, successArray, allSuccesses, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, storage_helper_1.GetAllChildrenWithPrefix(bucket, itemPath)];
                case 1:
                    allChildren = _a.sent();
                    return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return tryDeleteFile(f); }))];
                case 2:
                    successArray = _a.sent();
                    allSuccesses = successArray.reduce(function (acc, cur) { return (acc = acc && cur); }, true);
                    return [2 /*return*/, allSuccesses];
                case 3:
                    error_2 = _a.sent();
                    throw new verror_1.VError(error_2);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.RemoveFileWithChildren = RemoveFileWithChildren;
function RemoveFiles(bucket, items, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var googleStorageItemPaths, successArray, allSuccesses, results, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    googleStorageItemPaths = items.map(function (p) { return path_helpers_1.EnsureNoPrefixSlash(p); });
                    return [4 /*yield*/, Promise.all(googleStorageItemPaths.map(function (itemPath) {
                            return RemoveFileWithChildren(bucket, itemPath);
                        }))];
                case 1:
                    successArray = _a.sent();
                    allSuccesses = successArray.reduce(function (acc, cur) { return (acc = acc && cur); }, true);
                    results = {
                        success: allSuccesses
                    };
                    return [2 /*return*/, results];
                case 2:
                    error_3 = _a.sent();
                    throw new verror_1.VError(error_3);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.RemoveFiles = RemoveFiles;
//# sourceMappingURL=remove.js.map