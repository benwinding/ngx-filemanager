"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var moment = require('moment');
function GetFileMeta(bucket, item, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, in5mins, config, signedResult, url;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = bucket.file(item);
                    in5mins = moment()
                        .add(5, 'minutes')
                        .toDate();
                    config = { expires: in5mins, action: 'read' };
                    return [4 /*yield*/, file.getSignedUrl(config)];
                case 1:
                    signedResult = _a.sent();
                    url = signedResult.shift();
                    return [2 /*return*/, url];
            }
        });
    });
}
exports.GetFileMeta = GetFileMeta;
//# sourceMappingURL=getMeta.js.map