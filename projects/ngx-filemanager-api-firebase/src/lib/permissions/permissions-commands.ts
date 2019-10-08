import { File } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
import { permHelper } from './permissions-helper';

async function UpdateFilePermissions(
  file: File,
  newPermissions: CoreTypes.FilePermissionsObject
) {
  return permHelper.SetMetaPropertyObj(file, 'permissions', newPermissions);
}

export const permsCommands = {
  UpdateFilePermissions
};
