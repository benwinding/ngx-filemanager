"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var path_helpers_1 = require("../../utils/path-helpers");
function UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var newPath, pathNoPrefix, file, fileOptions;
        return tslib_1.__generator(this, function (_a) {
            newPath = path.join(directoryPath, originalname);
            pathNoPrefix = path_helpers_1.EnsureNoPrefixSlash(newPath);
            file = bucket.file(pathNoPrefix);
            fileOptions = {
                contentType: mimetype
            };
            return [2 /*return*/, file.save(buffer, fileOptions)];
        });
    });
}
exports.UploadFile = UploadFile;
//# sourceMappingURL=uploadFile.js.map