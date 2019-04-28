import { DecodeJWT, GetTokenFromRequest } from './token-helper';

test('Decode JWT test Bearer token', async () => {
  // tslint:disable-next-line:max-line-length
  const testBearerJWT = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmYjMyOWRmNjdiYjY4NDVkNDk1NDNiMGM0OWIzNWM4ODg1NzllYmEiLCJ0eXAiOiJKV1QifQ.eyJidWlsZGluZ3MiOlsiUFhIS041VENoeGJzMUhWYnBDNlQiXSwiZ3JvdXBzIjpbXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvbW11bml0aWxpbmstcjMiLCJhdWQiOiJjb21tdW5pdGlsaW5rLXIzIiwiYXV0aF90aW1lIjoxNTU0OTU4NDk2LCJ1c2VyX2lkIjoiRVpLNGp1ckF6WWdZQ2lBem5DT0NZNHhMVXc3MyIsInN1YiI6IkVaSzRqdXJBellnWUNpQXpuQ09DWTR4TFV3NzMiLCJpYXQiOjE1NTUzODMwOTAsImV4cCI6MTU1NTM4NjY5MCwiZW1haWwiOiJzbWVkZGxlczI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzbWVkZGxlczI0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.nqdhm_ySowjJJMO2pUBcsXYsNeR96EnUvKg8o7NW8EhHxl95GgylIX2xfpcWruxHhhZxTTGsIZUTlmNMk2cdbiXfGT2LAKelYTDAEGRsBDHHK7wSMeqJAw09HsTQqjYlIU3QJkT-SBUwz7eDTJu3vXxIdUOb6vYu_pkdc2sUuqUearYdYj0swbnJnc7F9RKf148aIsOh6JnOcmS-bclj0P39joR-kOe3If9hn7mlbuD1FdirQXZxa3JGBTe_XKnZL-3jxusL4-8TdUcG6HwUYDkIeIpamdrzfn96ycSW2BetHQV6Pfty6Dl5WhU3bJp7dh_Zzn7wmwfuDAtQF-wrmQ';
  const decoded = await DecodeJWT(testBearerJWT);
  // console.log('decoded token:', {decoded});
  expect(decoded).toBeTruthy();
  expect(decoded['auth_time']).toBe(1554958496);
  expect(decoded['user_id']).toBe('EZK4jurAzYgYCiAznCOCY4xLUw73');
});

function mockRequest(headers) {
  return {
    headers: headers
  } as Request;
}

test('Get bearer from request', async () => {
  const testRequest = mockRequest({
    // tslint:disable-next-line:max-line-length
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmYjMyOWRmNjdiYjY4NDVkNDk1NDNiMGM0OWIzNWM4ODg1NzllYmEiLCJ0eXAiOiJKV1QifQ.eyJidWlsZGluZ3MiOlsiUFhIS041VENoeGJzMUhWYnBDNlQiXSwiZ3JvdXBzIjpbXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvbW11bml0aWxpbmstcjMiLCJhdWQiOiJjb21tdW5pdGlsaW5rLXIzIiwiYXV0aF90aW1lIjoxNTU0OTU4NDk2LCJ1c2VyX2lkIjoiRVpLNGp1ckF6WWdZQ2lBem5DT0NZNHhMVXc3MyIsInN1YiI6IkVaSzRqdXJBellnWUNpQXpuQ09DWTR4TFV3NzMiLCJpYXQiOjE1NTUzODMwOTAsImV4cCI6MTU1NTM4NjY5MCwiZW1haWwiOiJzbWVkZGxlczI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzbWVkZGxlczI0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.nqdhm_ySowjJJMO2pUBcsXYsNeR96EnUvKg8o7NW8EhHxl95GgylIX2xfpcWruxHhhZxTTGsIZUTlmNMk2cdbiXfGT2LAKelYTDAEGRsBDHHK7wSMeqJAw09HsTQqjYlIU3QJkT-SBUwz7eDTJu3vXxIdUOb6vYu_pkdc2sUuqUearYdYj0swbnJnc7F9RKf148aIsOh6JnOcmS-bclj0P39joR-kOe3If9hn7mlbuD1FdirQXZxa3JGBTe_XKnZL-3jxusL4-8TdUcG6HwUYDkIeIpamdrzfn96ycSW2BetHQV6Pfty6Dl5WhU3bJp7dh_Zzn7wmwfuDAtQF-wrmQ'
  });
  const decoded = await GetTokenFromRequest(testRequest);
  // console.log('decoded token from request: ', {decoded});
  expect(decoded).toBeTruthy();
  expect(decoded.auth_time).toBe(1554958496);
  expect(decoded.user_id).toBe('EZK4jurAzYgYCiAznCOCY4xLUw73');
});
