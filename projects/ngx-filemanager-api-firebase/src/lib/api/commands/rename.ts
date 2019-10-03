import { Bucket } from '../../types/google-cloud-types';
import { getResult, getResultFromArray } from '../../utils/translation-helpers';
import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';

export async function RenameFile(
  bucket: Bucket,
  item: string,
  newItemPath: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const itemsPrefixOld = paths.EnsureNoPrefixSlash(item);
    const itemsPrefixNew = paths.EnsureNoPrefixSlash(newItemPath);
    const isFile = !item.endsWith('/');
    if (isFile) {
      const file = bucket.file(item);
      const resultObj = await storage.TryRenameFile(file, itemsPrefixOld, itemsPrefixNew);
      const result = getResult(resultObj);
      return result;
    }
    const allChildren = await storage.GetAllChildrenWithPrefix(bucket, itemsPrefixOld);
    const moveResults = await Promise.all(
      allChildren.map(f => storage.TryRenameFile(f, itemsPrefixOld, itemsPrefixNew))
    );
    const results = getResultFromArray(moveResults);
    return results;
  } catch (error) {
    throw new VError(error);
  }
}
