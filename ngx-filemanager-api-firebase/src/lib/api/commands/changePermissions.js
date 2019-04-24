"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var storage_helper_1 = require("../../utils/storage-helper");
var permissions_helper_1 = require("../../utils/permissions-helper");
var verror_1 = require("verror");
function SetPermissionToObj(permissionsObj, role, entity) {
    var newPermissions = tslib_1.__assign({}, permissions_helper_1.blankPermissionsObj(), permissionsObj);
    var list;
    switch (role) {
        case 'OWNER':
            list = newPermissions.owners;
            break;
        case 'WRITER':
            list = newPermissions.writers;
            break;
        case 'READER':
            list = newPermissions.readers;
            break;
        default:
            break;
    }
    var match = list.find(function (u) { return u.id === entity.id; });
    if (!match) {
        list.push(entity);
    }
    return newPermissions;
}
exports.SetPermissionToObj = SetPermissionToObj;
function TryChangeSingleFilePermissions(file, role, entity) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var currentPermissions, newPermissions, res, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, permissions_helper_1.RetrieveFilePermissions(file)];
                case 1:
                    currentPermissions = _a.sent();
                    newPermissions = SetPermissionToObj(currentPermissions, role, entity);
                    return [4 /*yield*/, permissions_helper_1.UpdateFilePermissions(file, newPermissions)];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
                case 3:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.TryChangeSingleFilePermissions = TryChangeSingleFilePermissions;
function tryChangePermissions(bucket, filePath, role, entity, isRecursive) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var allChildren, successArray, error_2, file, result, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isRecursive) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, storage_helper_1.GetAllChildrenWithPrefix(bucket, filePath)];
                case 2:
                    allChildren = _a.sent();
                    return [4 /*yield*/, Promise.all(allChildren.map(function (file) {
                            return TryChangeSingleFilePermissions(file, role, entity);
                        }))];
                case 3:
                    successArray = _a.sent();
                    return [2 /*return*/, successArray];
                case 4:
                    error_2 = _a.sent();
                    throw new verror_1.VError(error_2);
                case 5: return [3 /*break*/, 9];
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    file = bucket.file(filePath);
                    return [4 /*yield*/, TryChangeSingleFilePermissions(file, role, entity)];
                case 7:
                    result = _a.sent();
                    return [2 /*return*/, [result]];
                case 8:
                    error_3 = _a.sent();
                    throw new verror_1.VError(error_3);
                case 9: return [2 /*return*/];
            }
        });
    });
}
function ChangePermissions(bucket, items, role, entity, isRecursive, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var successArr, error_4;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all(items.map(function (filePath) {
                            return tryChangePermissions(bucket, filePath, role, entity, isRecursive);
                        }))];
                case 1:
                    successArr = _a.sent();
                    // const successArr = successArrArr.reduce((acc, cur) => {
                    //   return acc.concat(cur);
                    // }, []);
                    // const results = getResultFromArray(successArr);
                    // return results;
                    return [2 /*return*/, {
                            success: successArr
                        }];
                case 2:
                    error_4 = _a.sent();
                    throw new verror_1.VError(error_4);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ChangePermissions = ChangePermissions;
//# sourceMappingURL=changePermissions.js.map