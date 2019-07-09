const express = require('express');
const bodyParser = require('body-parser');
import * as Express from 'express';
import { AddCors } from './middleware';
const app: Express.Application = express();

app.use(bodyParser.json({limit: '100mb'}));
app.use(AddCors);

import * as admin from 'firebase-admin';
// const serviceAccount = require('../../../serviceAccountKey.json'); // api-demo-debug
const serviceAccount = require('../../../../serviceAccountKey.json'); // api-demo-debug

// Setup local firebase admin, using service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { FileManagerEndpointExpress } from '../../ngx-filemanager-api-firebase/src/public_api';
// app.use(HasBearerToken);
app.use('/filebrowser/', FileManagerEndpointExpress({
  logging: true,
  storage: admin.storage()
}));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('server listening on PORT=' + PORT);
});
