import { Bucket } from '../google-cloud-types';
import { getResultFromArray } from '../translation-helpers';

export async function MoveFiles(
  bucket: Bucket,
  items: string[],
  newDirectoryPath: string
) {
  const moveResults = await Promise.all(
    items.map(filename => {
      return bucket.file(filename).move(newDirectoryPath);
    })
  );
  const resultObjArr = moveResults.map(r => r[0]);
  const results = getResultFromArray(resultObjArr);
  return results;
}
