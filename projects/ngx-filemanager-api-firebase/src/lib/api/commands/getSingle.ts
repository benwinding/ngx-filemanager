import { Bucket, File } from '../../types/google-cloud-types';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import {
  translateStorageToResFile,
  translateRawStorage
} from '../../utils/translation-helpers';
const moment = require('moment');

async function GetUrl(file: File): Promise<string> {
  const in5mins = moment()
    .add(5, 'minutes')
    .toDate();
  const config: GetSignedUrlConfig = { expires: in5mins, action: 'read' };
  const signedResult = await file.getSignedUrl(config);
  const url = signedResult.shift();
  return url;
}

export async function GetSingle(
  bucket: Bucket,
  item: string,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResFile> {
  const file = bucket.file(item);
  const translatedF = translateRawStorage(file);
  const resFile = await translateStorageToResFile(translatedF);
  resFile.downloadUrl = await GetUrl(file);
  return resFile;
}
