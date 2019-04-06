import * as functions from 'firebase-functions';
import { FileManagerEndpointExpress } from 'ngx-filemanager-api-firebase/public_api';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.api_files = functions.https.onRequest(FileManagerEndpointExpress);
