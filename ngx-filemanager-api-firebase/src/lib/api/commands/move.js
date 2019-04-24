"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var translation_helpers_1 = require("../../utils/translation-helpers");
var path_helpers_1 = require("../../utils/path-helpers");
var path = require("path");
var storage_helper_1 = require("../../utils/storage-helper");
var verror_1 = require("verror");
function moveWithChildren(bucket, itemPath, newFolderPrefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var oldFolderPrefix_1, allChildren, successArray, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    oldFolderPrefix_1 = path_helpers_1.EnsureNoPrefixSlash(path.dirname(itemPath));
                    return [4 /*yield*/, storage_helper_1.GetAllChildrenWithPrefix(bucket, itemPath)];
                case 1:
                    allChildren = _a.sent();
                    return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return storage_helper_1.TryRenameFile(f, oldFolderPrefix_1, newFolderPrefix); }))];
                case 2:
                    successArray = _a.sent();
                    return [2 /*return*/, successArray];
                case 3:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.moveWithChildren = moveWithChildren;
function MoveFiles(bucket, items, newDirectoryPath, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var newFolderPrefix_1, moveResultsArrArr, moveResultsArr, results, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newFolderPrefix_1 = path_helpers_1.EnsureGoogleStoragePathDir(newDirectoryPath);
                    return [4 /*yield*/, Promise.all(items.map(function (filePath) { return moveWithChildren(bucket, filePath, newFolderPrefix_1); }))];
                case 1:
                    moveResultsArrArr = _a.sent();
                    moveResultsArr = moveResultsArrArr.reduce(function (acc, cur) {
                        return acc.concat(cur);
                    }, []);
                    results = translation_helpers_1.getResultFromArray(moveResultsArr);
                    return [2 /*return*/, results];
                case 2:
                    error_2 = _a.sent();
                    throw new verror_1.VError(error_2);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.MoveFiles = MoveFiles;
//# sourceMappingURL=move.js.map