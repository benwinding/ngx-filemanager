"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_helpers_1 = require("./path-helpers");
var path = require("path");
var verror_1 = require("verror");
function GetAllChildrenWithPrefix(bucket, fileOrDirectoryPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pathNoPrefix, options, result, files, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathNoPrefix = path_helpers_1.EnsureNoPrefixSlash(fileOrDirectoryPath);
                    options = {};
                    options.prefix = pathNoPrefix;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bucket.getFiles(options)];
                case 2:
                    result = _a.sent();
                    files = result[0];
                    return [2 /*return*/, files];
                case 3:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetAllChildrenWithPrefix = GetAllChildrenWithPrefix;
function TryRenameFile(file, oldPrefix, newPrefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var originalFilePath, relativePath, newPath, newFilePath, result, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    originalFilePath = file.name;
                    relativePath = originalFilePath.slice(oldPrefix.length);
                    newPath = path.join(newPrefix, relativePath);
                    newFilePath = path_helpers_1.EnsureNoPrefixSlash(newPath);
                    console.log("- renaming \"" + originalFilePath + "\" -> \"" + newFilePath + "\"");
                    return [4 /*yield*/, file.move(newFilePath)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
                case 2:
                    error_2 = _a.sent();
                    throw new verror_1.VError(error_2);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.TryRenameFile = TryRenameFile;
function TryCopyFile(file, oldPrefix, newPrefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var originalFilePath, relativePath, newPath, newFilePath, result, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    originalFilePath = file.name;
                    relativePath = originalFilePath.slice(oldPrefix.length);
                    newPath = path.join(newPrefix, relativePath);
                    newFilePath = path_helpers_1.EnsureNoPrefixSlash(newPath);
                    console.log("- copying \"" + originalFilePath + "\" -> \"" + newFilePath + "\"");
                    return [4 /*yield*/, file.copy(newFilePath)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[1]];
                case 2:
                    error_3 = _a.sent();
                    throw new verror_1.VError(error_3);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.TryCopyFile = TryCopyFile;
function SetMetaProperty(file, key, newValue) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var newValueString, metaObj, res, error_4;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newValueString = JSON.stringify(newValue);
                    metaObj = { metadata: {} };
                    metaObj.metadata[key] = newValueString;
                    return [4 /*yield*/, file.setMetadata(metaObj)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res[0]];
                case 2:
                    error_4 = _a.sent();
                    throw new verror_1.VError(error_4);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.SetMetaProperty = SetMetaProperty;
function GetMetaProperty(file, key) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var newValueString, meta, metaData, error_5, newValueObj;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file.getMetadata()];
                case 1:
                    meta = (_a.sent())[0];
                    metaData = meta.metadata || {};
                    newValueString = metaData[key] || '{}';
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    throw new verror_1.VError(error_5);
                case 3:
                    try {
                        newValueObj = JSON.parse(newValueString);
                        return [2 /*return*/, newValueObj];
                    }
                    catch (error) {
                        console.error("could not convert the meta property \"" + key + "\" to a JSON object", error);
                        return [2 /*return*/, newValueString];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.GetMetaProperty = GetMetaProperty;
//# sourceMappingURL=storage-helper.js.map