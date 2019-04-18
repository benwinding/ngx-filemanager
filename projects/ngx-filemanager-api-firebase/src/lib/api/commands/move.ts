import { Bucket } from '../../types/google-cloud-types';
import { getResultFromArray } from '../../utils/translation-helpers';
import {
  EnsureGoogleStoragePathDir,
  EnsureNoPrefixSlash
} from '../../utils/path-helpers';
import * as path from 'path';
import {
  GetAllChildrenWithPrefix,
  TryRenameFile
} from '../../utils/storage-helper';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
import { VError } from 'verror';

export async function moveWithChildren(
  bucket: Bucket,
  itemPath: string,
  newFolderPrefix: string
) {
  try {
    const oldFolderPrefix = EnsureNoPrefixSlash(path.dirname(itemPath));
    const allChildren = await GetAllChildrenWithPrefix(bucket, itemPath);
    const successArray = await Promise.all(
      allChildren.map(f => TryRenameFile(f, oldFolderPrefix, newFolderPrefix))
    );
    return successArray;
  } catch (error) {
    throw new VError(error);
  }
}

export async function MoveFiles(
  bucket: Bucket,
  items: string[],
  newDirectoryPath: string,
  claims: UserCustomClaims
) {
  try {
    const newFolderPrefix = EnsureGoogleStoragePathDir(newDirectoryPath);
    const moveResultsArrArr = await Promise.all(
      items.map(filePath => moveWithChildren(bucket, filePath, newFolderPrefix))
    );
    const moveResultsArr = moveResultsArrArr.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
    const results = getResultFromArray(moveResultsArr);
    return results;
  } catch (error) {
    throw new VError(error);
  }
}
