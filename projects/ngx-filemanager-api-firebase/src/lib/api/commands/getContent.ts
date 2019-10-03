import { Bucket } from '../../types/google-cloud-types';
import { StreamToPromise } from '../../utils/translation-helpers';
import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
import { VError } from 'verror';

export async function GetFileContent(
  bucket: Bucket,
  item: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const result = await bucket.file(item).get();
    const file = result[0];
    const content = await StreamToPromise(file.createReadStream());
    return content;
  } catch (error) {
    throw new VError(error);
  }
}
