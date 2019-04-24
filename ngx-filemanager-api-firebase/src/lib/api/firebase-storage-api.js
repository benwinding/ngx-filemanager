"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commands = require("./commands");
var verror_1 = require("verror");
function CheckHasBodyProp(body, bodyFieldName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exists;
        return tslib_1.__generator(this, function (_a) {
            exists = body[bodyFieldName];
            if (!exists) {
                throw new Error("Request is missing property in req.body: '" + bodyFieldName + "'");
            }
            return [2 /*return*/];
        });
    });
}
var NgxFileMangerApiFireBaseClass = /** @class */ (function () {
    function NgxFileMangerApiFireBaseClass(storage) {
        this.storage = storage;
    }
    NgxFileMangerApiFireBaseClass.prototype.getBucket = function (bucketname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, exists, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bucketname) {
                            throw new Error("Request is missing property in req.body: 'bucketname'");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        bucket = this.storage.bucket(bucketname);
                        return [4 /*yield*/, bucket.exists()];
                    case 2:
                        exists = (_a.sent()).shift();
                        if (!exists) {
                            throw new Error("bucket: \"" + bucketname + "\" doesn't exist, please create it first");
                        }
                        return [2 /*return*/, bucket];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('Error retrieving bucket: ' + error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleList = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, resFiles, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'path')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.GetList(bucket, body.path, claims)];
                    case 3:
                        resFiles = _a.sent();
                        response = {
                            result: resFiles
                        };
                        return [2 /*return*/, response];
                    case 4:
                        error_2 = _a.sent();
                        throw new verror_1.VError(error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleRename = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'newItemPath')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 3:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.RenameFile(bucket, body.item, body.newItemPath, claims)];
                    case 4:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 5:
                        error_3 = _a.sent();
                        throw new verror_1.VError(error_3);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleMove = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 1:
                        bucket = _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, commands.MoveFiles(bucket, body.items, body.newPath, claims)];
                    case 4:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 5:
                        error_4 = _a.sent();
                        throw new verror_1.VError(error_4);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleCopy = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, filesToCopy, result, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        filesToCopy = void 0;
                        if (body.items) {
                            filesToCopy = body.items;
                        }
                        else if (body.singleFileName) {
                            filesToCopy = [body.singleFileName];
                        }
                        else {
                            throw new Error('Request does not contain either body.items or body.singleFileName');
                        }
                        return [4 /*yield*/, commands.CopyFiles(bucket, filesToCopy, body.newPath, claims)];
                    case 3:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 4:
                        error_5 = _a.sent();
                        throw new verror_1.VError(error_5);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleRemove = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.RemoveFiles(bucket, body.items, claims)];
                    case 3:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 4:
                        error_6 = _a.sent();
                        throw new verror_1.VError(error_6);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleEdit = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'content')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 3:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.EditFile(bucket, body.item, body.content, claims)];
                    case 4:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 5:
                        error_7 = _a.sent();
                        throw new verror_1.VError(error_7);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleGetContent = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.GetFileContent(bucket, body.item, claims)];
                    case 3:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 4:
                        error_8 = _a.sent();
                        throw new verror_1.VError(error_8);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleGetMeta = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, downloadUrl, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.GetFileMeta(bucket, body.item, claims)];
                    case 3:
                        downloadUrl = _a.sent();
                        response = {
                            result: {
                                success: true
                            }
                        };
                        response.result.url = downloadUrl;
                        response.result.success = true;
                        return [2 /*return*/, response];
                    case 4:
                        error_9 = _a.sent();
                        throw new verror_1.VError(error_9);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleCreateFolder = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 2:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.CreateFolder(bucket, body.newPath, claims)];
                    case 3:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 4:
                        error_10 = _a.sent();
                        throw new verror_1.VError(error_10);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleSetPermissions = function (body, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'role')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, CheckHasBodyProp(body, 'entity')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getBucket(body.bucketname)];
                    case 4:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.ChangePermissions(bucket, body.items, body.role, body.entity, body.recursive, claims)];
                    case 5:
                        result = _a.sent();
                        response = {
                            result: result
                        };
                        return [2 /*return*/, response];
                    case 6:
                        error_11 = _a.sent();
                        throw new verror_1.VError(error_11);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NgxFileMangerApiFireBaseClass.prototype.HandleSaveFile = function (bucketname, directoryPath, originalname, mimetype, buffer, claims) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, result, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getBucket(bucketname)];
                    case 1:
                        bucket = _a.sent();
                        return [4 /*yield*/, commands.UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims)];
                    case 2:
                        _a.sent();
                        result = {
                            result: {
                                success: true
                            }
                        };
                        return [2 /*return*/, result];
                    case 3:
                        error_12 = _a.sent();
                        throw new verror_1.VError(error_12);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return NgxFileMangerApiFireBaseClass;
}());
exports.NgxFileMangerApiFireBaseClass = NgxFileMangerApiFireBaseClass;
//# sourceMappingURL=firebase-storage-api.js.map