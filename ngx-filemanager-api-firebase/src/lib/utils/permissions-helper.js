"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var token_helper_1 = require("./token-helper");
var storage_helper_1 = require("./storage-helper");
function blankPermissionsObj() {
    return {
        owners: [],
        writers: [],
        readers: []
    };
}
exports.blankPermissionsObj = blankPermissionsObj;
function RetrieveFilePermissions(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, storage_helper_1.GetMetaProperty(file, 'permissions')];
        });
    });
}
exports.RetrieveFilePermissions = RetrieveFilePermissions;
function UpdateFilePermissions(file, newPermissions) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, storage_helper_1.SetMetaProperty(file, 'permissions', newPermissions)];
        });
    });
}
exports.UpdateFilePermissions = UpdateFilePermissions;
function blankUserClaim() {
    return {
        groups: []
    };
}
function RetrieveCustomClaims(req) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var token, error_1, claims;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, token_helper_1.GetTokenFromRequest(req)];
                case 1:
                    token = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.warn('No token found on request, no permissions for user', { error: error_1 });
                    return [2 /*return*/, blankUserClaim()];
                case 3:
                    claims = token;
                    if (!claims.groups) {
                        claims.groups = [];
                    }
                    return [2 /*return*/, claims];
            }
        });
    });
}
exports.RetrieveCustomClaims = RetrieveCustomClaims;
/*
  Number	Octal Permission Representation	Ref
  0	 ---  No permission
  1	 --x  Execute permission
  2	 -w-  Write permission
  3	 -wx  Execute and write permission: 1 (execute) + 2 (write) = 3
  4	 r--  Read permission
  5	 r-x  Read and execute permission: 4 (read) + 1 (execute) = 5
  6	 rw-  Read and write permission: 4 (read) + 2 (write) = 6
  7	 rwx  All permissions: 4 (read) + 2 (write) + 1 (execute) = 7
*/
function GetPermissionForFile(filePermissions, userPermissions) {
    var groups = new Set(userPermissions.groups);
    var safePermissions = filePermissions || blankPermissionsObj();
    var isReader = IsPartOfArray(safePermissions.readers, groups);
    var isWriter = IsPartOfArray(safePermissions.writers, groups);
    var isOwner = IsPartOfArray(safePermissions.owners, groups);
    var currentPerms = 0;
    if (isReader) {
        currentPerms += 4; // 4 (read)
    }
    if (isWriter) {
        currentPerms += 2; // 2 (write)
    }
    if (isOwner) {
        currentPerms += 1; // 1 (execute)
    }
    return currentPerms;
}
exports.GetPermissionForFile = GetPermissionForFile;
function IsPartOfArray(arr, userGroupSet) {
    var hasNoPermissionsAtAll = !arr || !arr.length;
    if (hasNoPermissionsAtAll) {
        return true;
    }
    var isInArray = arr.find(function (entity) { return userGroupSet.has(entity.id); });
    return !!isInArray;
}
exports.IsPartOfArray = IsPartOfArray;
//# sourceMappingURL=permissions-helper.js.map