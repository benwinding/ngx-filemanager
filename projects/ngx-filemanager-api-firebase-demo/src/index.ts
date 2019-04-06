import * as functions from 'firebase-functions';
import {FileManagerEndpointExpress} from '../../../dist/ngx-filemanager-api-firebase/main';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.api_files = functions.https.onRequest(FileManagerEndpointExpress);
