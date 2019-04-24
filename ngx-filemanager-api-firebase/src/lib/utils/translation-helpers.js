"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_helpers_1 = require("./path-helpers");
var path = require("path");
var permissions_helper_1 = require("./permissions-helper");
var verror_1 = require("verror");
function translateRawStorage(storageObject) {
    var filePath = storageObject.name;
    var filePathParsed = path_helpers_1.EnsurePrefixSlash(filePath);
    return {
        ref: storageObject,
        name: path.basename(filePathParsed),
        fullPath: filePathParsed,
        isDir: path_helpers_1.HasTrailingSlash(filePathParsed)
    };
}
exports.translateRawStorage = translateRawStorage;
function makePhantomStorageFolder(folderPath) {
    var pathParsed = path_helpers_1.EnsureAbsolutePathDir(folderPath);
    return {
        ref: null,
        name: path.basename(pathParsed),
        fullPath: pathParsed,
        isDir: true,
        isPhantomFolder: true
    };
}
exports.makePhantomStorageFolder = makePhantomStorageFolder;
function translateStorageToResFile(f) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var resFile, aclObj, metaResp, metaData, customMeta, permissions, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resFile = {};
                    resFile.name = f.name;
                    if (f.isDir) {
                        resFile.type = 'dir';
                        resFile.fullPath = path_helpers_1.EnsureAbsolutePathDir(f.fullPath);
                    }
                    else {
                        resFile.type = 'file';
                        resFile.fullPath = path_helpers_1.EnsureAbsolutePathFile(f.fullPath);
                    }
                    if (f.isPhantomFolder) {
                        resFile.isPhantomFolder = true;
                        return [2 /*return*/, resFile];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, f.ref.acl.get()];
                case 2:
                    aclObj = (_a.sent())[0];
                    resFile.rightsFirebase = aclObj;
                    return [4 /*yield*/, f.ref.getMetadata()];
                case 3:
                    metaResp = _a.sent();
                    metaData = metaResp[0];
                    customMeta = metaData.metadata || {};
                    return [4 /*yield*/, permissions_helper_1.RetrieveFilePermissions(f.ref)];
                case 4:
                    permissions = _a.sent();
                    resFile.permissions = permissions;
                    resFile.size = metaData.size;
                    resFile.date = metaData.updated;
                    resFile.metaData = customMeta;
                    return [2 /*return*/, resFile];
                case 5:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.translateStorageToResFile = translateStorageToResFile;
function StreamToPromise(stream) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var stringRes;
                    stream.on('readable', function (buffer) {
                        var part = buffer.read().toString();
                        stringRes += part;
                        console.log('stream data ' + part);
                    });
                    stream.on('end', function (res) {
                        resolve(stringRes);
                    });
                    stream.on('error', function (err) {
                        var errmsg = 'StreamToPromise(stream: Readable), Error reading stream: ' +
                            err.message;
                        console.error(errmsg, { err: err });
                        reject(errmsg);
                    });
                })];
        });
    });
}
exports.StreamToPromise = StreamToPromise;
function getResult(res) {
    var fail = res.statusCode !== 204;
    return {
        success: !fail,
        error: fail ? 'error: ' + res.body : null
    };
}
exports.getResult = getResult;
function getResultFromArray(res) {
    var fail = res.find(function (r) { return r.statusCode !== 204; });
    return {
        success: !fail,
        error: fail ? 'error: ' + JSON.stringify(fail.body) : null
    };
}
exports.getResultFromArray = getResultFromArray;
//# sourceMappingURL=translation-helpers.js.map