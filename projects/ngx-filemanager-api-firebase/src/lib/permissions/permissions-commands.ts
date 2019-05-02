import { File } from '../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { storage } from '../utils/storage-helper';

async function UpdateFilePermissions(
  file: File,
  newPermissions: CoreTypes.FilePermissionsObject
) {
  return storage.SetMetaProperty(file, 'permissions', newPermissions);
}

export const permsCommands = {
  UpdateFilePermissions
};
