import { Bucket } from '../../types/google-cloud-types';
import { getResult, getResultFromArray } from '../../utils/translation-helpers';
import { EnsureNoPrefixSlash } from '../../utils/path-helpers';
import { GetAllChildrenWithPrefix, TryRenameFile } from '../../utils/storage-helper';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';

export async function RenameFile(
  bucket: Bucket,
  item: string,
  newItemPath: string,
  claims: UserCustomClaims
) {
  const itemsPrefixOld = EnsureNoPrefixSlash(item);
  const itemsPrefixNew = EnsureNoPrefixSlash(newItemPath);
  const isFile = !item.endsWith('/');
  if (isFile) {
    const file = bucket.file(item);
    const resultObj = await TryRenameFile(file, itemsPrefixOld, itemsPrefixNew);
    const result = getResult(resultObj);
    return result;
  }
  const allChildren = await GetAllChildrenWithPrefix(bucket, itemsPrefixOld);
  const moveResults = await Promise.all(
    allChildren.map(f => TryRenameFile(f, itemsPrefixOld, itemsPrefixNew))
  );
  const results = getResultFromArray(moveResults);
  return results;
}
