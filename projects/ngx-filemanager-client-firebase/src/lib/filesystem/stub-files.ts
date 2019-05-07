import * as path from 'path-browserify';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
import { EnsureNoTrailingSlash, EnsureTrailingSlash } from '../utils/path-helpers';

export function MakeItem2(itemPath: string): CoreTypes.ResFile {
  return {
    name: path.basename(itemPath),
    fullPath: itemPath,
    rightsFirebase: [],
    permissions: {
      others: 'read/write',
      readers: ['Example Reader'],
      writers: ['Example Writer', 'Managers']
    },
    size: '111',
    date: new Date().toISOString(),
    type: itemPath.endsWith('/') ? 'dir' : 'file'
  };
}

export function MakeFile(itemPath: string): CoreTypes.ResFile {
  const filePath = EnsureNoTrailingSlash(itemPath);
  return MakeItem2(filePath);
}

export function MakeDir(itemPath: string): CoreTypes.ResFile {
  const dirPath = EnsureTrailingSlash(itemPath);
  return MakeItem2(dirPath);
}

export const stubFiles = [
  MakeFile('/image1.png'),
  MakeFile('/image2.jpeg'),
  MakeFile('/subfile.txt'),
  MakeFile('/subfile.mp3'),
  MakeFile('/subfile.mp4'),
  MakeFile('/tables.csv'),
  MakeFile('/time.docx'),
  MakeDir('/emptyFolder/'),
  MakeDir('/subfolder/'),
  MakeFile('/subfolder/file.txt'),

  MakeDir('/subfolder/sub1/'),
  MakeFile('/subfolder/sub1/file.txt'),
  MakeDir('/subfolder/sub1/sub1/'),
  MakeFile('/subfolder/sub1/sub1/file.txt'),
  MakeDir('/subfolder/sub1/sub1/sub1/'),
  MakeFile('/subfolder/sub1/sub1/sub1/file.txt'),
  MakeDir('/subfolder/sub1/sub2/'),
  MakeFile('/subfolder/sub1/sub2/file.txt'),
  MakeDir('/subfolder/sub1/sub2/sub1/'),
  MakeFile('/subfolder/sub1/sub2/sub1/file.txt'),

  MakeDir('/subfolder/sub2/'),
  MakeFile('/subfolder/sub2/file.txt'),
  MakeDir('/subfolder/sub2/sub1/'),
  MakeFile('/subfolder/sub2/sub1/file.txt'),
  MakeDir('/subfolder/sub2/sub1/sub1/'),
  MakeFile('/subfolder/sub2/sub1/sub1/file.txt'),
  MakeDir('/subfolder/sub2/sub2/'),
  MakeFile('/subfolder/sub2/sub2/file.txt'),
  MakeDir('/subfolder/sub2/sub2/sub1/'),
  MakeFile('/subfolder/sub2/sub2/sub1/file.txt')
];