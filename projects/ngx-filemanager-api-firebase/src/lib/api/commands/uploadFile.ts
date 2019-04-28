import { Bucket } from '../../types/google-cloud-types';
import * as path from 'path';
import { CoreTypes } from 'ngx-filemanager-core';
import { paths } from '../../utils/paths';

export async function UploadFile(
  bucket: Bucket,
  directoryPath: string,
  originalname: string,
  mimetype: string,
  buffer: Buffer,
  claims: CoreTypes.UserCustomClaims
) {
  const newPath = path.join(directoryPath, originalname);
  const pathNoPrefix = paths.EnsureNoPrefixSlash(newPath);
  const file = bucket.file(pathNoPrefix);
  const fileOptions = {
    contentType: mimetype
  };
  return file.save(buffer, fileOptions);
}
