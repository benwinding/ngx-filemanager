import { Bucket } from '../../types/google-cloud-types';
import { StreamToPromise } from '../../utils/translation-helpers';
import { api } from '../../types/core-types';

export async function GetFileContent(
  bucket: Bucket,
  item: string,
  claims: api.UserCustomClaims
) {
  const result = await bucket.file(item).get();
  const file = result[0];
  const content = await StreamToPromise(file.createReadStream());
  return content;
}
