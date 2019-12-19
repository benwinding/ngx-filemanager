import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
import { ResultsObjFromArray } from '../../utils/translation-helpers';

export async function RenameFile(
  bucket: Bucket,
  inputSrc: string,
  inputDest: string,
  claims: CoreTypes.UserCustomClaims
) {
  try {
    const parsedSrc = paths.EnsureNoPrefixSlash(inputSrc);
    const parsedDest = paths.EnsureNoPrefixSlash(inputDest);
    const fileItem = bucket.file(parsedSrc);
    const [exists] = await fileItem.exists();
    if (!exists) {
      throw new Error(`
item: "${fileItem.name}" does not exist
bucket: "${bucket.name}"

inputSrc: "${inputSrc}",
inputDest: "${inputDest}",

parsedSrc: "${parsedSrc}",
parsedDest: "${parsedDest}",
`);
    }
    const isFile = !inputSrc.endsWith('/');
    if (isFile) {
      const resultObj = await storage.TryRenameFile(
        fileItem,
        parsedSrc,
        parsedDest
      );
      return resultObj;
    }
    const allChildren = await storage.GetAllChildrenWithPrefix(
      bucket,
      parsedSrc
    );
    const moveResults = await Promise.all(
      allChildren.map(f => storage.TryRenameFile(f, parsedSrc, parsedDest))
    );
    return ResultsObjFromArray(moveResults);
  } catch (error) {
    throw new VError(error);
  }
}
