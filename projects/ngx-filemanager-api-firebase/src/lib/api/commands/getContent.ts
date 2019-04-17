import { Bucket } from '../../types/google-cloud-types';
import { StreamToPromise } from '../../utils/translation-helpers';
import { UserCustomClaims } from 'ngx-filemanager-core';

export async function GetFileContent(
  bucket: Bucket,
  item: string,
  claims: UserCustomClaims
) {
  const result = await bucket.file(item).get();
  const file = result[0];
  const content = await StreamToPromise(file.createReadStream());
  return content;
}
