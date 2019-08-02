export interface FileIcon {
  /**
   * Name of the icon, e.g. 'javascript'
   */
  name: string;

  /**
   * Define the file extensions that should use this icon.
   * E.g. ['js']
   */
  fileExtensions?: string[];

  /**
   * Define if there are some static file names that should apply this icon.
   * E.g. ['sample.js']
   */
  fileNames?: string[];

  /**
   * Define if there is a light icon available.
   */
  light?: boolean;

  /**
   * Define if there is a high contrast icon available.
   */
  highContrast?: boolean;

  /**
   * Define if the icon should be disabled.
   */
  disabled?: boolean;
}

export interface FolderTheme {
  /**
   * Name of the theme
   */
  name: string;

  /**
   * Define the default icon for folders in a theme.
   */
  defaultIcon: DefaultIcon;

  /**
   * Icon for root folders.
   */
  rootFolder?: DefaultIcon;

  /**
   * Defines folder icons for specific folder names.
   */
  icons?: FolderIcon[];
}

export interface FolderIcon {
  /**
   * Name of the icon, e.g. 'src'
   */
  name: string;

  /**
   * Define the folder names that should apply the icon.
   * E.g. ['src', 'source']
   */
  folderNames: string[];

  /**
   * Define if there is a light icon available.
   */
  light?: boolean;

  /**
   * Define if there is a high contrast icon available.
   */
  highContrast?: boolean;

  /**
   * Define if the icon should be disabled.
   */
  disabled?: boolean;
}

export interface DefaultIcon {
  /**
   * Name of the icon, e.g. 'src'
   */
  name: string;

  /**
   * Define if there is a light icon available.
   */
  light?: boolean;

  /**
   * Define if there is a high contrast icon available.
   */
  highContrast?: boolean;
}

export class FileIcons {
  /**
   * Define the default icon for files.
   */
  defaultIcon: DefaultIcon;

  /**
   * Defines all folder icons.
   */
  icons?: FileIcon[];
}

export const fileIcons: FileIcons = {
  defaultIcon: { name: 'file' },
  icons: [
    { name: 'word', fileExtensions: ['doc', 'docx', 'rtf'] },
    { name: 'pdf', fileExtensions: ['pdf'] },
    { name: 'table', fileExtensions: ['xlsx', 'xls', 'csv', 'tsv'] },
    {
      name: 'html',
      fileExtensions: ['html', 'htm', 'xhtml', 'html_vm', 'asp']
    },
    {
      name: 'markdown',
      fileExtensions: ['md', 'markdown', 'rst']
    },
    { name: 'yaml', fileExtensions: ['yaml', 'YAML-tmLanguage', 'yml'] },
    {
      name: 'xml',
      fileExtensions: [
        'xml',
        'plist',
        'xsd',
        'dtd',
        'xsl',
        'xslt',
        'resx',
        'iml',
        'xquery',
        'tmLanguage',
        'manifest',
        'project'
      ],
      fileNames: ['.htaccess']
    },
    {
      name: 'image',
      fileExtensions: [
        'png',
        'jpeg',
        'jpg',
        'gif',
        'svg',
        'ico',
        'tif',
        'tiff',
        'psd',
        'psb',
        'ami',
        'apx',
        'bmp',
        'bpg',
        'brk',
        'cur',
        'dds',
        'dng',
        'exr',
        'fpx',
        'gbr',
        'img',
        'jbig2',
        'jb2',
        'jng',
        'jxr',
        'pbm',
        'pgf',
        'pic',
        'raw',
        'webp',
        'eps'
      ]
    },
    { name: 'tex', fileExtensions: ['tex', 'cls', 'sty'] },
    {
      name: 'powerpoint',
      fileExtensions: [
        'pptx',
        'ppt',
        'pptm',
        'potx',
        'potm',
        'ppsx',
        'ppsm',
        'pps',
        'ppam',
        'ppa'
      ]
    },
    {
      name: 'video',
      fileExtensions: [
        'webm',
        'mkv',
        'flv',
        'vob',
        'ogv',
        'ogg',
        'gifv',
        'avi',
        'mov',
        'qt',
        'wmv',
        'yuv',
        'rm',
        'rmvb',
        'mp4',
        'm4v',
        'mpg',
        'mp2',
        'mpeg',
        'mpe',
        'mpv',
        'm2v'
      ]
    },
    { name: 'audio', fileExtensions: ['mp3', 'flac', 'm4a', 'wma', 'aiff'] },
    { name: 'document', fileExtensions: ['txt'] }
  ]
};

export const getFileIconName = (filename: string) => {
  filename = filename.toLowerCase();
  if (!filename || !filename.includes('.')) {
    return fileIcons.defaultIcon.name;
  }
  const ext = getFileExtension(filename);
  const matchesExt = fileIcons.icons.filter(
    x => !!x.fileExtensions && !!x.fileExtensions.filter(y => y === ext).length
  );
  const matchesFilename = fileIcons.icons.filter(
    x => !!x.fileNames && !!x.fileNames.filter(y => y === filename).length
  );
  if (!!matchesFilename.length) {
    return matchesFilename[0].name;
  } else if (!!matchesExt.length) {
    return matchesExt[0].name;
  }

  return fileIcons.defaultIcon.name;
};

export const isFileImage = (filename: string) =>
  getFileIconName(filename) === 'image';

export const getFileExtension = (filename: string) => filename.split('.').pop();

export const getFileName = (filename: string) =>
  filename.split('.').slice(-2, -1)[0];

export const getFileIcon = (filename: string) => {
  return '/assets/fileicons/' + getFileIconName(filename) + '.svg';
};
