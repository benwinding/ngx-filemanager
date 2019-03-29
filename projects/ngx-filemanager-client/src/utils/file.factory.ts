import { ResFile } from 'ngx-filemanager-core/public_api';

// temporary directory for the client while it refreshes
export function MakeClientDirectory(name: string, fullPath: string): ResFile {
  return {
    name: name,
    fullPath: fullPath,
    rights: '',
    size: null,
    date: new Date().toISOString(),
    type: 'dir'
  };
}
