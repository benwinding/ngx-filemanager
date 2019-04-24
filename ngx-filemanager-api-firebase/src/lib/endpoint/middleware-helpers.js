"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OptionRequestsAreOk(req, res, next) {
    if (req.method === 'OPTIONS') {
        console.log('Recieved OPTIONS request sending OK');
        res.status(200).send('Options are OK\n');
        return;
    }
    next();
}
exports.OptionRequestsAreOk = OptionRequestsAreOk;
function PostRequestsOnly(req, res, next) {
    if (req.method !== 'POST') {
        var msg = 'Only POST requests are supported\n';
        console.warn(msg);
        res.status(400).send(msg);
        return;
    }
    next();
}
exports.PostRequestsOnly = PostRequestsOnly;
function HasBodyProp(bodyFieldName) {
    return function (req, res, next) {
        if (!req.body[bodyFieldName]) {
            var msg = "Request is missing property in req.body: \"" + bodyFieldName + "\" \n";
            console.warn(msg);
            res.status(400).send(msg);
            return;
        }
        next();
    };
}
exports.HasBodyProp = HasBodyProp;
function HasQueryParam(paramName) {
    return function (req, res, next) {
        if (!req.query[paramName]) {
            var msg = "Request is missing property in req.params: \"" + paramName + "\" \n";
            console.warn(msg);
            res.status(400).send(msg);
            return;
        }
        next();
    };
}
exports.HasQueryParam = HasQueryParam;
//# sourceMappingURL=middleware-helpers.js.map