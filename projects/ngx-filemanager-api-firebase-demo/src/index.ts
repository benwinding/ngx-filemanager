import * as admin from 'firebase-admin';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../serviceAccountKey.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

import { FileManagerEndpointExpress } from 'ngx-filemanager-api-firebase/public_api';

const express = require('express');
import * as Express from 'express';
const app: Express.Application = express();
app.use(FileManagerEndpointExpress);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log('listening on PORT=' + PORT);
});
