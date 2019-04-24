"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var middleware_1 = require("./middleware");
var app = express();
app.use(bodyParser.json());
app.use(middleware_1.AddCors);
app.use(middleware_1.LogRequest);
var admin = require("firebase-admin");
// Setup local firebase admin, using service account credentials
// const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
// const serviceAccount = require('../../../../serviceAccountKey.json');
var serviceAccount = require('../../../../serviceAccountKey.TESTS.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var public_api_1 = require("../../ngx-filemanager-api-firebase/src/public_api");
app.use('/ApiPublic/files/', public_api_1.FileManagerEndpointExpress(admin.storage()));
var PORT = process.env.PORT || 4444;
app.listen(PORT, function () {
    console.log('server listening on PORT=' + PORT);
});
//# sourceMappingURL=index.js.map