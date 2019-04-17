import { Bucket } from '../../types/google-cloud-types';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import { UserCustomClaims } from 'ngx-filemanager-core';
const moment = require('moment');

export async function GetFileMeta(
  bucket: Bucket,
  item: string,
  claims: UserCustomClaims
): Promise<string> {
  const file = bucket.file(item);
  const in5mins = moment()
    .add(5, 'minutes')
    .toDate();
  const config: GetSignedUrlConfig = { expires: in5mins, action: 'read' };
  const signedResult = await file.getSignedUrl(config);
  const url = signedResult.shift();
  return url;
}
