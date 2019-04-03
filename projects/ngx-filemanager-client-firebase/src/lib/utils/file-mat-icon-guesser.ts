export const fileIcons = {
  defaultIcon: { name: 'insert_drive_file' },
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
      name: 'local_movies',
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
    { name: 'audiotrack', fileExtensions: ['mp3', 'flac', 'm4a', 'wma', 'aiff'] },
    { name: 'insert_drive_file', fileExtensions: ['txt'] }
  ]
};

const getFileIconName = (filename: string) => {
  if (!filename) {
    return fileIcons.defaultIcon.name;
  }
  const ext = getFileExtension(filename);

  const matchesExt = fileIcons.icons.filter(
    x => !!x.fileExtensions && !!x.fileExtensions.filter(y => y === ext).length
  );
  if (!!matchesExt.length) {
    return matchesExt[0].name;
  }

  return fileIcons.defaultIcon.name;
};

const isFileImage = (filename: string) => getFileIconName(filename) === 'image';

const getFileExtension = (filename: string) => filename.split('.').pop();

const getFileName = (filename: string) => {
  const slashSegments = filename.split('/');
  const filenameWithExt = slashSegments.pop();
  const dotSegments = filenameWithExt.split('.');
  if (dotSegments.length < 2) {
    return filenameWithExt;
  }
  dotSegments.pop();
  return dotSegments.join('.');
};

const getFolderIconName = (filename: string) => {
  return 'folder';
};

const getFileIcon = (filename: string) => {
  return getFileIconName(filename);
};
const getFolderIcon = (filename: string) => {
  return getFolderIconName(filename);
};

export const guesser = {
  isFileImage,
  getFileExtension,
  getFileName,
  getFolderIconName,
  getFolderIcon,
  getFileIconName,
  getFileIcon
};
