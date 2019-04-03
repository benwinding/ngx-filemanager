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

const folderIcons: FolderTheme[] = [
  {
    name: 'specific',
    defaultIcon: { name: 'folder-aws' },
    rootFolder: { name: 'folder-root' },
    icons: [
      { name: 'folder-src', folderNames: ['src', 'source', 'sources'] },
      { name: 'folder-dist', folderNames: ['dist', 'out', 'build', 'release'] },
      {
        name: 'folder-css',
        folderNames: ['css', 'stylesheet', 'stylesheets', 'style', 'styles']
      },
      { name: 'folder-sass', folderNames: ['sass', '_sass', 'scss', '_scss'] },
      {
        name: 'folder-images',
        folderNames: [
          'images',
          'image',
          'img',
          'icons',
          'icon',
          'ico',
          'screenshot',
          'screenshots'
        ]
      },
      { name: 'folder-scripts', folderNames: ['script', 'scripts'] },
      { name: 'folder-node', folderNames: ['node_modules'] },
      {
        name: 'folder-javascript',
        folderNames: ['js', 'javascript', 'javascripts']
      },
      { name: 'folder-font', folderNames: ['font', 'fonts'] },
      { name: 'folder-bower', folderNames: ['bower_components'] },
      {
        name: 'folder-test',
        folderNames: [
          'test',
          'tests',
          'testing',
          '__tests__',
          '__snapshots__',
          '__mocks__',
          '__test__',
          'spec',
          'specs'
        ]
      },
      {
        name: 'folder-jinja',
        folderNames: ['jinja', 'jinja2', 'j2'],
        light: true
      },
      { name: 'folder-markdown', folderNames: ['markdown', 'md'] },
      { name: 'folder-php', folderNames: ['php'] },
      { name: 'folder-phpmailer', folderNames: ['phpmailer'] },
      { name: 'folder-sublime', folderNames: ['sublime'] },
      {
        name: 'folder-docs',
        folderNames: ['doc', 'docs', 'documents', 'documentation']
      },
      {
        name: 'folder-git',
        folderNames: ['.git', 'submodules', '.submodules']
      },
      { name: 'folder-github', folderNames: ['.github'] },
      { name: 'folder-gitlab', folderNames: ['.gitlab'] },
      { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
      {
        name: 'folder-views',
        folderNames: [
          'view',
          'views',
          'screen',
          'screens',
          'page',
          'pages',
          'html'
        ]
      },
      { name: 'folder-vue', folderNames: ['vue'] },
      { name: 'folder-expo', folderNames: ['.expo'] },
      {
        name: 'folder-config',
        folderNames: [
          'config',
          'configs',
          'configuration',
          'configurations',
          'settings',
          'META-INF'
        ]
      },
      {
        name: 'folder-i18n',
        folderNames: [
          'i18n',
          'internationalization',
          'lang',
          'language',
          'languages',
          'locale',
          'locales',
          'localization',
          'translation',
          'translations'
        ]
      },
      { name: 'folder-components', folderNames: ['components'] },
      { name: 'folder-aurelia', folderNames: ['aurelia_project'] },
      {
        name: 'folder-resource',
        folderNames: [
          'resource',
          'resources',
          'res',
          'asset',
          'assets',
          'static'
        ]
      },
      {
        name: 'folder-lib',
        folderNames: ['lib', 'libs', 'library', 'libraries']
      },
      {
        name: 'folder-theme',
        folderNames: ['themes', 'theme', 'color', 'colors', 'design', 'designs']
      },
      { name: 'folder-webpack', folderNames: ['webpack'] },
      { name: 'folder-global', folderNames: ['global'] },
      { name: 'folder-public', folderNames: ['public', 'wwwroot'] },
      {
        name: 'folder-include',
        folderNames: ['include', 'includes', '_includes']
      },
      { name: 'folder-docker', folderNames: ['docker', '.docker'] },
      { name: 'folder-ngrx-effects', folderNames: ['effects'] },
      { name: 'folder-ngrx-state', folderNames: ['states', 'state'] },
      { name: 'folder-ngrx-reducer', folderNames: ['reducers', 'reducer'] },
      { name: 'folder-ngrx-actions', folderNames: ['actions'] },
      { name: 'folder-ngrx-entities', folderNames: ['entities'] },
      { name: 'folder-redux-reducer', folderNames: ['reducers', 'reducer'] },
      { name: 'folder-redux-actions', folderNames: ['actions'] },
      { name: 'folder-redux-store', folderNames: ['store'] },
      { name: 'folder-react-components', folderNames: ['components'] },
      {
        name: 'folder-database',
        folderNames: ['db', 'database', 'sql', 'data', '_data']
      },
      { name: 'folder-log', folderNames: ['log', 'logs'] },
      {
        name: 'folder-temp',
        folderNames: [
          'temp',
          '.temp',
          'tmp',
          '.tmp',
          'cached',
          'cache',
          '.cache'
        ]
      },
      { name: 'folder-aws', folderNames: ['aws', '.aws'] },
      { name: 'folder-audio', folderNames: ['audio', 'audios', 'music'] },
      {
        name: 'folder-video',
        folderNames: ['video', 'videos', 'movie', 'movies']
      },
      { name: 'folder-kubernetes', folderNames: ['kubernetes', 'k8s'] },
      { name: 'folder-import', folderNames: ['import', 'imports', 'imported'] },
      { name: 'folder-export', folderNames: ['export', 'exports', 'exported'] },
      { name: 'folder-wakatime', folderNames: ['wakatime'] },
      { name: 'folder-circleci', folderNames: ['.circleci'] },
      { name: 'folder-wordpress', folderNames: ['wp-content'] },
      { name: 'folder-gradle', folderNames: ['gradle', '.gradle'] },
      { name: 'folder-coverage', folderNames: ['coverage', '.nyc-output'] },
      {
        name: 'folder-class',
        folderNames: ['class', 'classes', 'model', 'models']
      },
      {
        name: 'folder-other',
        folderNames: ['other', 'others', 'misc', 'miscellaneous']
      },
      { name: 'folder-typescript', folderNames: ['typescript', 'ts'] },
      { name: 'folder-routes', folderNames: ['routes'] },
      { name: 'folder-ci', folderNames: ['.ci', 'ci'] },
      {
        name: 'folder-benchmark',
        folderNames: [
          'benchmark',
          'benchmarks',
          'performance',
          'measure',
          'measures',
          'measurement'
        ]
      },
      {
        name: 'folder-messages',
        folderNames: [
          'messages',
          'forum',
          'chat',
          'chats',
          'conversation',
          'conversations'
        ]
      },
      { name: 'folder-less', folderNames: ['less'] },
      { name: 'folder-python', folderNames: ['python', '__pycache__'] },
      { name: 'folder-debug', folderNames: ['debug', 'debugging'] },
      { name: 'folder-fastlane', folderNames: ['fastlane'] },
      {
        name: 'folder-plugin',
        folderNames: [
          'plugin',
          'plugins',
          '_plugins',
          'extension',
          'extensions',
          'addon',
          'addons'
        ]
      },
      {
        name: 'folder-controller',
        folderNames: ['controller', 'controllers', 'service', 'services']
      },
      { name: 'folder-ansible', folderNames: ['ansible'] },
      { name: 'folder-server', folderNames: ['server', 'servers', 'backend'] },
      { name: 'folder-client', folderNames: ['client', 'clients', 'frontend'] },
      { name: 'folder-tasks', folderNames: ['tasks', 'tickets'] },
      { name: 'folder-android', folderNames: ['android'] },
      { name: 'folder-ios', folderNames: ['ios'] },
      { name: 'folder-upload', folderNames: ['uploads', 'upload'] },
      { name: 'folder-download', folderNames: ['downloads', 'download'] },
      { name: 'folder-tools', folderNames: ['tools'] },
      { name: 'folder-helper', folderNames: ['helpers', 'helper'] }
    ]
  },
  {
    name: 'classic',
    defaultIcon: { name: 'folder' },
    rootFolder: { name: 'folder-root' }
  },
  { name: 'none', defaultIcon: { name: '' } }
];

const getFileIconName = (input: string) => {
  if (!input || !input.includes('.')) {
    return fileIcons.defaultIcon.name;
  }
  const filename = input.toLowerCase();
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
  return 'folder-other';
  filename = filename.toLowerCase();
  const matches = folderIcons[0].icons.filter(
    x => !!x.folderNames && !!x.folderNames.filter(y => y === filename).length
  );
  if (!!matches.length) {
    return matches[0].name;
  }

  return folderIcons[0].defaultIcon.name;
};

export const guesser = {
  isFileImage,
  getFileExtension,
  getFileName,
  getFolderIconName,
  getFileIconName,
};
