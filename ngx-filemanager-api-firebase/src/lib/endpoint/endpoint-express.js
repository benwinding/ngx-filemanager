"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Add middle ware to this route
var express = require('express');
var middleware_helpers_1 = require("./middleware-helpers");
var firebase_storage_api_1 = require("../api/firebase-storage-api");
var verror_1 = require("verror");
var fmApi;
var endpoint = express();
endpoint.use(middleware_helpers_1.OptionRequestsAreOk);
endpoint.use('/hello', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        console.log('HELLO');
        res.status(200).send('HELLO\n');
        return [2 /*return*/];
    });
}); });
endpoint.use(middleware_helpers_1.PostRequestsOnly);
var middleware_upload_1 = require("./middleware-upload");
var permissions_helper_1 = require("../utils/permissions-helper");
endpoint.post('/upload', middleware_helpers_1.HasQueryParam('bucketname'), middleware_helpers_1.HasQueryParam('directoryPath'), middleware_upload_1.ParseUploadFile, function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var bucketname, directoryPath, files, userClaims, results, success_1, finalResult, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketname = req.query.bucketname;
                directoryPath = req.query.directoryPath;
                files = req.files;
                return [4 /*yield*/, permissions_helper_1.RetrieveCustomClaims(req)];
            case 1:
                userClaims = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Promise.all(files.map(function (file) {
                        return trySaveFile(bucketname, directoryPath, file, userClaims);
                    }))];
            case 3:
                results = _a.sent();
                success_1 = {
                    result: {
                        success: true
                    }
                };
                finalResult = results.reduce(function (acc, cur) {
                    if (cur.result.error) {
                        return cur;
                    }
                    return success_1;
                }, success_1);
                res.status(200).send(finalResult);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Error occurred while uploading: \n', verror_1.VError.fullStack(error_1));
                res.status(400).send('Error occurred while uploading: \n' + error_1.message);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
function trySaveFile(bucketname, directoryPath, f, userClaims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, fmApi.HandleSaveFile(bucketname, directoryPath, f.originalname, f.mimetype, f.buffer, userClaims)];
        });
    });
}
endpoint.use('/', middleware_helpers_1.HasBodyProp('action'), middleware_helpers_1.HasBodyProp('bucketname'), function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var action, userClaims, body, _a, error_2, returnedError;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                action = req.body.action;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 25, , 26]);
                return [4 /*yield*/, permissions_helper_1.RetrieveCustomClaims(req)];
            case 2:
                userClaims = _b.sent();
                body = void 0;
                _a = action;
                switch (_a) {
                    case 'list': return [3 /*break*/, 3];
                    case 'rename': return [3 /*break*/, 5];
                    case 'move': return [3 /*break*/, 7];
                    case 'copy': return [3 /*break*/, 9];
                    case 'remove': return [3 /*break*/, 11];
                    case 'edit': return [3 /*break*/, 13];
                    case 'getContent': return [3 /*break*/, 15];
                    case 'createFolder': return [3 /*break*/, 17];
                    case 'getMeta': return [3 /*break*/, 19];
                    case 'changePermissions': return [3 /*break*/, 21];
                    case 'compress': return [3 /*break*/, 23];
                    case 'extract': return [3 /*break*/, 23];
                    case 'downloadMultiple': return [3 /*break*/, 23];
                }
                return [3 /*break*/, 23];
            case 3: return [4 /*yield*/, fmApi.HandleList(req.body, userClaims)];
            case 4:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 5: return [4 /*yield*/, fmApi.HandleRename(req.body, userClaims)];
            case 6:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 7: return [4 /*yield*/, fmApi.HandleMove(req.body, userClaims)];
            case 8:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 9: return [4 /*yield*/, fmApi.HandleCopy(req.body, userClaims)];
            case 10:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 11: return [4 /*yield*/, fmApi.HandleRemove(req.body, userClaims)];
            case 12:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 13: return [4 /*yield*/, fmApi.HandleEdit(req.body, userClaims)];
            case 14:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 15: return [4 /*yield*/, fmApi.HandleGetContent(req.body, userClaims)];
            case 16:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 17: return [4 /*yield*/, fmApi.HandleCreateFolder(req.body, userClaims)];
            case 18:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 19: return [4 /*yield*/, fmApi.HandleGetMeta(req.body, userClaims)];
            case 20:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 21: return [4 /*yield*/, fmApi.HandleSetPermissions(req.body, userClaims)];
            case 22:
                body = _b.sent();
                return [3 /*break*/, 24];
            case 23: throw new Error('action has not been implemented');
            case 24:
                res.status(200).send(body);
                return [3 /*break*/, 26];
            case 25:
                error_2 = _b.sent();
                console.error('Error while processing request: \n', verror_1.VError.fullStack(error_2));
                returnedError = {
                    error: "Bad request to ngx-file-manager!",
                    errorDetail: error_2.message,
                    requestBody: req.body
                };
                res.status(400).send(returnedError);
                return [3 /*break*/, 26];
            case 26: return [2 /*return*/];
        }
    });
}); });
endpoint.use(notImplemented);
function notImplemented(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var bodyString;
        return tslib_1.__generator(this, function (_a) {
            bodyString = JSON.stringify(req.body);
            res.status(501).send('That request has not been implemented: ' + bodyString);
            return [2 /*return*/];
        });
    });
}
function CheckStorageInitialized(storage) {
    // storage.app();
}
/*
Use by attaching to a firebase function
exports.FileManagerApi = StorageEndpoint;
*/
exports.FileManagerEndpointExpress = function (storage) {
    fmApi = new firebase_storage_api_1.NgxFileMangerApiFireBaseClass(storage);
    return endpoint;
};
//# sourceMappingURL=endpoint-express.js.map