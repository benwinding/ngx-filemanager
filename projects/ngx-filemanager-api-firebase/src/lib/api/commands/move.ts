import { Bucket } from '../../types/google-cloud-types';
import { ResultsObjFromArray } from '../../utils/translation-helpers';
import * as path from 'path';
import { CoreTypes } from '../../types';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';

export async function moveWithChildren(
  bucket: Bucket,
  itemPath: string,
  newFolderPrefix: string
) {
  try {
    const oldFolderPrefix = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
    const allChildren = await storage.GetAllChildrenWithPrefix(bucket, itemPath);
    const successArray = await Promise.all(
      allChildren.map(f => storage.TryRenameFile(f, oldFolderPrefix, newFolderPrefix))
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
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    const moveResultsArrArr = await Promise.all(
      items.map(filePath => moveWithChildren(bucket, filePath, newFolderPrefix))
    );
    const moveResultsArr = moveResultsArrArr.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
    return ResultsObjFromArray(moveResultsArr);
  } catch (error) {
    throw new VError(error);
  }
}
