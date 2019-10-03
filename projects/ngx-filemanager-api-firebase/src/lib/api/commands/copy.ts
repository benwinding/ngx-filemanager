import { Bucket } from '../../types/google-cloud-types';
import { getResultFromArray } from '../../utils/translation-helpers';
import * as path from 'path';
import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';

export async function copyWithChildren(
  bucket: Bucket,
  itemPath: string,
  newFolderPrefix: string
) {
  try {
    const oldFolderPrefix = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
    const allChildren = await storage.GetAllChildrenWithPrefix(bucket, itemPath);
    const successArray = await Promise.all(
      allChildren.map(f => storage.TryCopyFile(f, oldFolderPrefix, newFolderPrefix))
    );
    return successArray;
  } catch (error) {
    throw new VError(error);
  }
}

export async function CopyFiles(
  bucket: Bucket,
  items: string[],
  newDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
    const copyResultsArrArr = await Promise.all(
      items.map(filePath => copyWithChildren(bucket, filePath, newFolderPrefix))
    );
    const copyResultsArr = copyResultsArrArr.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
    const results = getResultFromArray(copyResultsArr);
    return results;
  } catch (error) {
    throw new VError(error);
  }
}
