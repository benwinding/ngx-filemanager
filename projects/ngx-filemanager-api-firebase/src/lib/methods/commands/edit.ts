import { Bucket } from '../google-cloud-types';
import { getResultFromArray, getResult } from '../translation-helpers';

export async function EditFile(bucket: Bucket, item: string, content: string) {
  const result = { success: true };
  try {
    await bucket.file(item).save(content);
  } catch (error) {
    result.success = false;
  }
  return result;
}
