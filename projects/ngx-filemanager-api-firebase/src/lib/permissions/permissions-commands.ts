import { File } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
import { permHelper } from './permissions-helper';

async function UpdateFilePermissions(
  file: File,
  newPermissions: CoreTypes.FilePermissionsObject
) {
  return permHelper.SetMetaPropertyObj(file, 'permissions', newPermissions);
}

async function UpdateFileSize(
  file: File,
  bytesCount: number
) {
  return permHelper.SetMetaPropertyString(file, 'size', bytesCount+'');
}

async function UpdateFolderSize(
  file: File,
  bytesCount: number
) {
  return permHelper.SetMetaPropertyString(file, 'size', bytesCount+'');
}

async function SetFolderProps(
  file: File,
  bytesCount: number,
  childCount: number
) {
  await Promise.all([
    permHelper.SetMetaPropertyString(file, 'size', bytesCount+''),
    permHelper.SetMetaPropertyString(file, 'child_count', childCount+''),
  ])  
}

export const permsCommands = {
  UpdateFilePermissions,
  UpdateFileSize,
  UpdateFolderSize,
  SetFolderProps
};
