"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var translation_helpers_1 = require("../../utils/translation-helpers");
var verror_1 = require("verror");
function GetFileContent(bucket, item, claims) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result, file, content, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, bucket.file(item).get()];
                case 1:
                    result = _a.sent();
                    file = result[0];
                    return [4 /*yield*/, translation_helpers_1.StreamToPromise(file.createReadStream())];
                case 2:
                    content = _a.sent();
                    return [2 /*return*/, content];
                case 3:
                    error_1 = _a.sent();
                    throw new verror_1.VError(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetFileContent = GetFileContent;
//# sourceMappingURL=getContent.js.map