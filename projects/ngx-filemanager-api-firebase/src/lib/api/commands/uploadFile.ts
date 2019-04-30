import { Bucket, File } from '../../types/google-cloud-types';
import * as path from 'path';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { paths } from '../../utils/paths';

export async function SaveBufferToPath(
  file: File,
  mimetype: string,
  buffer: Buffer
) {
  const fileOptions = {
    contentType: mimetype
  };
  console.log('uploadFile: SaveBufferToPath', { mimetype, path: file.name });
  return file.save(buffer, fileOptions);
}

export async function GetNextFreeFilenameRecursively(
  bucket: Bucket,
  inputFile: File
): Promise<File> {
  const [exists] = await inputFile.exists();
  if (!exists) {
    return inputFile;
  }
  const filePath = inputFile.name;
  const nextPath = paths.Add2ToPath(filePath);
  const nextFreeFile = bucket.file(nextPath);
  return GetNextFreeFilenameRecursively(bucket, nextFreeFile);
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
    const uniqueFile = await GetNextFreeFilenameRecursively(bucket, file);
    return SaveBufferToPath(uniqueFile, mimetype, buffer);
  }
  return SaveBufferToPath(file, mimetype, buffer);
}
