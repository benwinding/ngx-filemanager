import { UploadFile } from './uploadFile';
import { testHelper } from '../../utils/test-helper';

const testBucket = testHelper.testBucket;

test('creates file and deletes it', async () => {
  const claims = {} as any;
  const result = await UploadFile(
    testBucket,
    '/uploadFile.spec.ts/',
    'myfile.txt',
    'text/plain',
    new Buffer('hi there'),
    claims
  );
  const file = testBucket.file('uploadFile.spec.ts/myfile.txt');
  const [exists] = await file.exists();
  expect(exists).toBe(true);
  if (exists) {
    file.delete();
  }
});
