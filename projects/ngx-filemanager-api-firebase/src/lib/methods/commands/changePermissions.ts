import { Bucket, File } from '../google-cloud-types';
import { ResultObj } from '../core-types';

export async function ChangePermissions(
  bucket: Bucket,
  items: string[],
  perms: string,
  isRecursive: boolean
): Promise<ResultObj> {
  return null;
}
