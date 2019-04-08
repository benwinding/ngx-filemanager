const express = require('express');
const bodyParser = require('body-parser');
import * as Express from 'express';
import { AddCors, LogRequest } from './middleware';
const app: Express.Application = express();

app.use(bodyParser.json());
app.use(AddCors);
app.use(LogRequest);

import * as admin from 'firebase-admin';
// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'resvu-integration-tests',
  storageBucket: testbucketname
});

import { FileManagerEndpointExpress } from '../../ngx-filemanager-api-firebase/src/public_api';
app.use('/api_files/', FileManagerEndpointExpress(admin.storage()));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log('server listening on PORT=' + PORT);

  const routePaths = app._router.stack.map(r => r.name); // registered routes
  console.log('configured routes: ', routePaths);
});
