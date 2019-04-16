import * as admin from 'firebase-admin';
import { NgxFileMangerApiFireBaseClass } from './firebase-storage-api';
import { api } from '../types/core-types';

// Setup local firebase admin, using service account credentials
const serviceAccount = require('../../../../../serviceAccountKey.TESTS.json');
const testbucketname = 'resvu-integration-tests.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: testbucketname
});

const testStorage = admin.storage();
const testMethods = new NgxFileMangerApiFireBaseClass(testStorage);

function makeBaseRequest(action: api.FileManagerAction): api.ReqBodyAction {
  return {
    bucketname: testbucketname,
    action: action
  };
}

function makeList(path: string): api.ReqBodyList {
  return { ...makeBaseRequest('list'), path: path };
}

function mockRequest(headers) {
  return {
    headers: headers
  } as Request;
}

test('Test list some files', async () => {
  expect(1).toBe(1);
  const testListBody = makeList('/test-list-files/');

  const testRequest = mockRequest({
    // tslint:disable-next-line:max-line-length
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmYjMyOWRmNjdiYjY4NDVkNDk1NDNiMGM0OWIzNWM4ODg1NzllYmEiLCJ0eXAiOiJKV1QifQ.eyJidWlsZGluZ3MiOlsiUFhIS041VENoeGJzMUhWYnBDNlQiXSwiZ3JvdXBzIjpbXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvbW11bml0aWxpbmstcjMiLCJhdWQiOiJjb21tdW5pdGlsaW5rLXIzIiwiYXV0aF90aW1lIjoxNTU0OTU4NDk2LCJ1c2VyX2lkIjoiRVpLNGp1ckF6WWdZQ2lBem5DT0NZNHhMVXc3MyIsInN1YiI6IkVaSzRqdXJBellnWUNpQXpuQ09DWTR4TFV3NzMiLCJpYXQiOjE1NTUzODMwOTAsImV4cCI6MTU1NTM4NjY5MCwiZW1haWwiOiJzbWVkZGxlczI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzbWVkZGxlczI0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.nqdhm_ySowjJJMO2pUBcsXYsNeR96EnUvKg8o7NW8EhHxl95GgylIX2xfpcWruxHhhZxTTGsIZUTlmNMk2cdbiXfGT2LAKelYTDAEGRsBDHHK7wSMeqJAw09HsTQqjYlIU3QJkT-SBUwz7eDTJu3vXxIdUOb6vYu_pkdc2sUuqUearYdYj0swbnJnc7F9RKf148aIsOh6JnOcmS-bclj0P39joR-kOe3If9hn7mlbuD1FdirQXZxa3JGBTe_XKnZL-3jxusL4-8TdUcG6HwUYDkIeIpamdrzfn96ycSW2BetHQV6Pfty6Dl5WhU3bJp7dh_Zzn7wmwfuDAtQF-wrmQ'
  });

  // const response = await testMethods.HandleList(testListBody, testRequest);
  // console.log(JSON.stringify(response, null, 2));
});
