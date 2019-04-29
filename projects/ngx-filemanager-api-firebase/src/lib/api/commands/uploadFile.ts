import { Bucket } from '../../types/google-cloud-types';
import * as path from 'path';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { paths } from '../../utils/paths';

export async function SaveBufferToPath(
  bucket: Bucket,
  filePath: string,
  mimetype: string,
  buffer: Buffer,
) {
  const finalFile = bucket.file(filePath);
  const fileOptions = {
    contentType: mimetype
  };
  return finalFile.save(buffer, fileOptions);
}

export async function UploadFile(
  bucket: Bucket,
  directoryPath: string,
  originalname: string,
  mimetype: string,
  buffer: Buffer,
  claims: CoreTypes.UserCustomClaims
) {
  const newPath = path.join(directoryPath, originalname);
  const bucketFilePath = paths.EnsureGoogleStoragePathFile(newPath);
  const file = bucket.file(bucketFilePath);
  const [exists] = await file.exists();
  if (exists) {
    const copiedPath = paths.Add2ToPath(bucketFilePath);
    return SaveBufferToPath(bucket, copiedPath, mimetype, buffer);
  }
  return SaveBufferToPath(bucket, bucketFilePath, mimetype, buffer);
}
