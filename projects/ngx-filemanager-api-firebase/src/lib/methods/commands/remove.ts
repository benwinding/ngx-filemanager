import { Bucket } from '../google-cloud-types';
import { getResultFromArray } from '../translation-helpers';

export async function RemoveFiles(
  bucket: Bucket,
  items: string[]
) {
  const removeResults = await Promise.all(
    items.map(filename => {
      return bucket.file(filename).delete();
    })
  );
  const resultObjArr = removeResults.map(r => r[0]);
  const results = getResultFromArray(resultObjArr);
  return results;
}
