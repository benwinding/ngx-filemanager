import { CoreTypes } from '../../core-types';
import path from 'path-browserify';

// temporary directory for the client while it refreshes
export function MakeClientDirectory(
  name: string,
  fullPath: string
): CoreTypes.ResFile {
  return {
    name: name,
    fullPath: fullPath,
    rightsFirebase: [],
    permissions: {} as any,
    size: null,
    date: new Date().toISOString(),
    type: 'dir'
  };
}

export function MakeClientFile(
  fullPath: string
): CoreTypes.ResFile {
  const fileName = path.basename(fullPath);
  return {
    name: fileName,
    fullPath: fullPath,
    rightsFirebase: [],
    permissions: {} as any,
    size: null,
    date: new Date().toISOString(),
    type: 'file'
  };
}
