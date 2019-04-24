"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_helpers_1 = require("../../utils/path-helpers");
function CreateFolder(bucket, newDirectoryPath, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var directoryPath, file, result, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    directoryPath = path_helpers_1.EnsureGoogleStoragePathDir(newDirectoryPath);
                    file = bucket.file(directoryPath);
                    result = { success: true };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, file.save('')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    result.success = false;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
exports.CreateFolder = CreateFolder;
//# sourceMappingURL=createFolder.js.map