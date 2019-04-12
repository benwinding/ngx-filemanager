import { Bucket } from '../google-cloud-types';
import { getResultFromArray } from '../translation-helpers';
import { EnsureGoogleStoragePathDir } from '../path-helpers';
import * as path from 'path';

export async function MoveFiles(
  bucket: Bucket,
  items: string[],
  newDirectoryPath: string
) {
  const newDirGooglePath = EnsureGoogleStoragePathDir(newDirectoryPath);
  const moveResults = await Promise.all(
    items.map(filePath => {
      const fileName = path.basename(filePath);
      const newGoogleFilePath = path.join(newDirGooglePath, fileName);
      return bucket.file(filePath).move(newGoogleFilePath);
    })
  );
  const resultObjArr = moveResults.map(r => r[0]);
  const results = getResultFromArray(resultObjArr);
  return results;
}
