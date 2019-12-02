import { Bucket, File } from '../../types/google-cloud-types';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import { VError } from 'verror';
import { CoreTypes } from '../../types';
import {
  translateStorageToResFile,
  translateRawStorage
} from '../../utils/translation-helpers';
const moment = require('moment');

async function GetUrl(file: File): Promise<string> {
  try {
    const in5mins = moment()
      .add(5, 'minutes')
      .toDate();
    const config: GetSignedUrlConfig = { expires: in5mins, action: 'read' };
    const signedResult = await file.getSignedUrl(config);
    const url = signedResult.shift();
    return url;
  } catch (error) {
    throw new VError(error);
  }
}

export async function GetSingle(
  bucket: Bucket,
  item: string,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResFile> {
  try {
    const file = bucket.file(item);
    const translatedF = translateRawStorage(file);
    const resFile = await translateStorageToResFile(translatedF);
    resFile.downloadUrl = await GetUrl(file);
    return resFile;
  } catch (error) {
    throw new VError(error);
  }
}
