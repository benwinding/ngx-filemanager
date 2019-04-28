import { File } from '../types/google-cloud-types';
import { CoreTypes } from 'ngx-filemanager-core';
import { storage } from '../utils/storage-helper';

async function UpdateFilePermissions(
  file: File,
  newPermissions: CoreTypes.PermissionsObject
) {
  return storage.SetMetaProperty(file, 'permissions', newPermissions);
}

export const permsCommands = {
  UpdateFilePermissions
};
