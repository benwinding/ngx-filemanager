"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var translation_helpers_1 = require("../../utils/translation-helpers");
var path_helpers_1 = require("../../utils/path-helpers");
var storage_helper_1 = require("../../utils/storage-helper");
var verror_1 = require("verror");
function RenameFile(bucket, item, newItemPath, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemsPrefixOld_1, itemsPrefixNew_1, isFile, file, resultObj, result, allChildren, moveResults, results, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    itemsPrefixOld_1 = path_helpers_1.EnsureNoPrefixSlash(item);
                    itemsPrefixNew_1 = path_helpers_1.EnsureNoPrefixSlash(newItemPath);
                    isFile = !item.endsWith('/');
                    if (!isFile) return [3 /*break*/, 2];
                    file = bucket.file(item);
                    return [4 /*yield*/, storage_helper_1.TryRenameFile(file, itemsPrefixOld_1, itemsPrefixNew_1)];
                case 1:
                    resultObj = _a.sent();
                    result = translation_helpers_1.getResult(resultObj);
                    return [2 /*return*/, result];
                case 2: return [4 /*yield*/, storage_helper_1.GetAllChildrenWithPrefix(bucket, itemsPrefixOld_1)];
                case 3:
                    allChildren = _a.sent();
                    return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return storage_helper_1.TryRenameFile(f, itemsPrefixOld_1, itemsPrefixNew_1); }))];
                case 4:
                    moveResults = _a.sent();
                    results = translation_helpers_1.getResultFromArray(moveResults);
                    return [2 /*return*/, results];
                case 5:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.RenameFile = RenameFile;
//# sourceMappingURL=rename.js.map