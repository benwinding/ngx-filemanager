const express = require('express');
const bodyParser = require('body-parser');
import * as Express from 'express';
import { AddCors, LogRequest, HasBearerToken } from './middleware';
const app: Express.Application = express();

app.use(bodyParser.json());
app.use(AddCors);
app.use(LogRequest);

import * as admin from 'firebase-admin';
// Setup local firebase admin, using service account credentials
// const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const serviceAccount = require('../../../serviceAccountKey.json');
// const serviceAccount = require('../../../../serviceAccountKey.TESTS.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { FileManagerEndpointExpress } from '../../ngx-filemanager-api-firebase/src/public_api';
// app.use(HasBearerToken);
app.use('/filebrowser/', FileManagerEndpointExpress(admin.storage()));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log('server listening on PORT=' + PORT);
});
