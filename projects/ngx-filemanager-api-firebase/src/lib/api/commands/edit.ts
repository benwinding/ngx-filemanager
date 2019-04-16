import { Bucket } from '../../types/google-cloud-types';
import { api } from '../../types/core-types';

export async function EditFile(
  bucket: Bucket,
  item: string,
  content: string,
  claims: api.UserCustomClaims
) {
  const result = { success: true };
  try {
    await bucket.file(item).save(content);
  } catch (error) {
    result.success = false;
  }
  return result;
}
