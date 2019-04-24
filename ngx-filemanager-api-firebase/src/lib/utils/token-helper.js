"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jwt = require("jsonwebtoken");
function GetTokenFromRequest(req) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var idToken, isInHeader, hasCookie, decodedToken;
        return tslib_1.__generator(this, function (_a) {
            isInHeader = req.headers['authorization'] &&
                req.headers['authorization'].startsWith('Bearer ');
            hasCookie = req['cookies'];
            if (isInHeader) {
                // Read the ID Token from the Authorization header.
                idToken = req.headers['authorization'].split('Bearer ')[1];
            }
            else if (hasCookie) {
                // Read the ID Token from cookie.
                idToken = req['cookies'].__session;
            }
            else {
                throw new Error('Request Header doesn\'t contain a valid authorization bearer');
            }
            decodedToken = DecodeJWT(idToken);
            return [2 /*return*/, decodedToken];
        });
    });
}
exports.GetTokenFromRequest = GetTokenFromRequest;
function DecodeJWT(bearer) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var decoded;
        return tslib_1.__generator(this, function (_a) {
            try {
                decoded = jwt.decode(bearer, { json: true });
                return [2 /*return*/, decoded];
            }
            catch (error) {
                throw new Error('Error decoding JWT' + error.message);
            }
            return [2 /*return*/];
        });
    });
}
exports.DecodeJWT = DecodeJWT;
//# sourceMappingURL=token-helper.js.map