"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cors = require('cors');
function AddCors(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            cors({ origin: true })(req, res, function () {
                                resolve();
                            });
                        })];
                case 2:
                    _a.sent();
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.AddCors = AddCors;
function LogRequest(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var body, msg;
        return tslib_1.__generator(this, function (_a) {
            body = req.body;
            msg = "\n---- request: " + req.url + "\nquery: " + JSON.stringify(req.query, null, 4) + "\n body: " + JSON.stringify(body, null, 4) + "\n----";
            console.log(msg);
            next();
            return [2 /*return*/];
        });
    });
}
exports.LogRequest = LogRequest;
//# sourceMappingURL=middleware.js.map