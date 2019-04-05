import { Bucket } from '../google-cloud-types';
import { getResult } from '../translation-helpers';

export async function RenameFile(
  bucket: Bucket,
  item: string,
  newItemPath: string
) {
  const moveResult = await bucket.file(item).move(newItemPath);
  const resultObj = moveResult[0];
  const result = getResult(resultObj);
  return result;
}
