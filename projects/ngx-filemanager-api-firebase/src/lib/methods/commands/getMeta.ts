import { Bucket } from '../google-cloud-types';
import { GetSignedUrlConfig } from '@google-cloud/storage';
const moment = require('moment');

export async function GetFileMeta(bucket: Bucket, item: string): Promise<string> {
  const file = bucket.file(item);
  const in5mins = moment().add(5, 'minutes').toDate();
  const config: GetSignedUrlConfig = { expires: in5mins, action: 'read' };
  const signedResult = await file.getSignedUrl(config);
  const url = signedResult.shift();
  return url;
}
