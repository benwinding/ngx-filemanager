import { Bucket } from '../../types/google-cloud-types';
import { translateStorageToResFile } from '../../utils/translation-helpers';
import { VError } from 'verror';
import { perms } from '../../permissions';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { storage } from '../../utils/storage-helper';

export async function GetList(
  bucket: Bucket,
  inputDirectoryPath: string,
  claims: CoreTypes.UserCustomClaims
): Promise<CoreTypes.ResFile[]> {
  try {
    const resFiles = await storage.GetListWithoutPermissions(
      bucket,
      inputDirectoryPath
    );
    const filesAllowed = resFiles.filter(f => {
      return perms.queries.TryCheckFileAccess(f.permissions, claims, 'read');
    });
    return filesAllowed;
  } catch (error) {
    throw new VError(error);
  }
}
