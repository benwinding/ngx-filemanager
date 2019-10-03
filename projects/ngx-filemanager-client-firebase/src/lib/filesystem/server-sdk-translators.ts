import { CoreTypes } from 'projects/ngx-filemanager-core/src/public_api';
import { permsFactory } from 'projects/ngx-filemanager-api-firebase/src/lib/permissions/permissions.factory';

export async function translateStoragePrefixToResFile(
  f: firebase.storage.Reference
): Promise<CoreTypes.ResFile> {
  const resFile: CoreTypes.ResFile = {} as any;
  resFile.name = f.name;
  resFile.type = 'dir';
  resFile.fullPath = f.fullPath;
  try {
    try {
      const [metaData] = await f.getMetadata();
      resFile.size = metaData.size;
      resFile.date = metaData.updated;
      const customMeta = (metaData && metaData.metadata) || {};
      const permissions = await RetrieveFilePermissions(f);
      resFile.permissions = permissions;
      resFile.metaData = customMeta;
    } catch (error) {
      resFile.permissions = permsFactory.blankPermissionsObj();
    }
    return resFile;
  } catch (error) {
    throw new Error(error);
  }
}

export async function translateStorageItemToResFile(
  f: firebase.storage.Reference
): Promise<CoreTypes.ResFile> {
  const resFile: CoreTypes.ResFile = {} as any;
  resFile.name = f.name;
  resFile.type = 'file';
  resFile.fullPath = f.fullPath;
  try {
    try {
      const [metaData] = await f.getMetadata();
      resFile.size = metaData.size;
      resFile.date = metaData.updated;
      const customMeta = (metaData && metaData.metadata) || {};
      const permissions = await RetrieveFilePermissions(f);
      resFile.permissions = permissions;
      resFile.metaData = customMeta;
    } catch (error) {
      resFile.permissions = permsFactory.blankPermissionsObj();
    }
    return resFile;
  } catch (error) {
    throw new Error(error);
  }
}

async function GetMetaPropObject(f: firebase.storage.Reference, key: string) {
  try {
    const [meta] = await f.getMetadata();
    const metaData = meta.metadata || {};
    const newValueString = metaData[key] || null;
    const newValObj = JSON.parse(newValueString);
    return newValObj;
  } catch (error) {
    return {};
  }
}

async function RetrieveFilePermissions(
  file: firebase.storage.Reference
): Promise<CoreTypes.FilePermissionsObject> {
  const fromStorage = await GetMetaPropObject(file, 'permissions');
  const blank = permsFactory.blankPermissionsObj();
  const safePerms = {
    ...blank,
    ...(fromStorage || {})
  };
  return safePerms;
}


