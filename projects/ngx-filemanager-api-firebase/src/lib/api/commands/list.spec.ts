import * as admin from 'firebase-admin';
import { GetList, GetFiles, GetFilesAndPrefixes, GetListFromStorage } from './list';
import { GetFilesOptions } from '@google-cloud/storage';
import {File} from '../../types/google-cloud-types';
import { logObj } from '../../utils/logger';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../../serviceAccountKey.json');
// const testbucketname = 'resvu-integration-tests.appspot.com';
const testbucketname = 'cl-system-content';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testBucket = testStorage.bucket(testbucketname);

test('ls getFiles 1 /test-subfiles', async () => {
  const options = {
    delimiter: '/',
    includeTrailingDelimiter: true,
    autoPaginate: false
  } as any;

  const result = await GetFilesAndPrefixes(testBucket, options);
  // files.map(f => (f.ref = null));
  logObj(result);
  // expect(files.length).toBe(4);
});

// test('ls getFiles 2 /test-subfiles', async () => {
//   const options: GetFilesOptions = {
//     delimiter: '/',
//     includeTrailingDelimiter: true,
//     prefix: 'test-subfiles'
//   } as any;
//   const files = await GetFiles(testBucket, options);
//   // files.map(f => (f.ref = null));
//   // logObj(files);
//   expect(files.length).toBe(1);
// });

// test('ls current files/directories in /root-dir-2', async () => {
//   const files = await GetList(testBucket, '/root-dir-2');
//   // files.map(f => (f.ref = null));
//   // logObj(files);
//   expect(files.length).toBe(4);
// });

// test('ls current files/directories in /', async () => {
//   const files = await GetList(testBucket, '/');
//   // files.map(f => (f.ref = null));
//   // logObj(files);
//   expect(files.length).toBe(4);
// });
