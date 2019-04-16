import { Bucket } from '../../types/google-cloud-types';
import * as path from 'path';
import { EnsureNoPrefixSlash } from '../../utils/path-helpers';

export async function UploadFile(
  bucket: Bucket,
  directoryPath: string,
  originalname: string,
  mimetype: string,
  buffer: Buffer
) {
  const newPath = path.join(directoryPath, originalname);
  const pathNoPrefix = EnsureNoPrefixSlash(newPath);
  const file = bucket.file(pathNoPrefix);
  const fileOptions = {
    contentType: mimetype
  };
  await file.save(buffer, fileOptions);
}
