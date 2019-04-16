import { Bucket } from '../../types/google-cloud-types';
import { getResultFromArray } from '../../utils/translation-helpers';
import {
  EnsureGoogleStoragePathDir,
  EnsureNoPrefixSlash
} from '../../utils/path-helpers';
import * as path from 'path';
import { GetAllChildrenWithPrefix, TryCopyFile } from '../../utils/storage-helper';

export async function copyWithChildren(
  bucket: Bucket,
  itemPath: string,
  newFolderPrefix: string
) {
  const oldFolderPrefix = EnsureNoPrefixSlash(path.dirname(itemPath));
  const allChildren = await GetAllChildrenWithPrefix(bucket, itemPath);
  const successArray = await Promise.all(
    allChildren.map(f => TryCopyFile(f, oldFolderPrefix, newFolderPrefix))
  );
  return successArray;
}

export async function CopyFiles(
  bucket: Bucket,
  items: string[],
  newDirectoryPath: string
) {
  const newFolderPrefix = EnsureGoogleStoragePathDir(newDirectoryPath);
  const copyResultsArrArr = await Promise.all(
    items.map(filePath => copyWithChildren(bucket, filePath, newFolderPrefix))
  );
  const copyResultsArr = copyResultsArrArr.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
  const results = getResultFromArray(copyResultsArr);
  return results;
}
