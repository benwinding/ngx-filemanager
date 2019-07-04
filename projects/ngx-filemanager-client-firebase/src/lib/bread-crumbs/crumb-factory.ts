import path from 'path-browserify';
import { EnsureAbsoluteDirectory } from '../utils/path-helpers';

export interface BreadCrumb {
  label: string;
  path?: string;
  icon?: string;
  virtualPath?: string;
}

function MakeRootCrumb(virtualRoot): BreadCrumb {
  return {
    label: '',
    icon: 'home',
    path: virtualRoot,
    virtualPath: '/'
  };
}

function MakeWarningCrumb(virtualRoot): BreadCrumb {
  return {
    label: '',
    icon: 'mood_bad',
    path: virtualRoot,
    virtualPath: virtualRoot
  };
}

const MakeCrumbs = (virtualRoot: string, absolutePath: string) => {
  const virtualRootParsed = EnsureAbsoluteDirectory(virtualRoot);
  const absolutePathParsed = EnsureAbsoluteDirectory(absolutePath);
  if (absolutePathParsed.indexOf(virtualRootParsed) !== 0) {
    console.warn('Absolute path is not within the virtualRoot', {virtualRoot, absolutePath});
    return [MakeWarningCrumb(virtualRootParsed)];
  }

  if (absolutePathParsed === virtualRootParsed) {
    return [MakeRootCrumb(virtualRootParsed)];
  }

  const relativeVirtualRoot = absolutePathParsed.slice(
    virtualRootParsed.length
  );
  const crumbs: BreadCrumb[] = [];
  relativeVirtualRoot
    .split('/')
    .filter(p => !!p)
    .reduce((currentPath, curr) => {
      const dirname = path.basename(currentPath);
      const crumb = {
        label: dirname,
        path: EnsureAbsoluteDirectory(virtualRootParsed + currentPath),
        virtualPath: EnsureAbsoluteDirectory(currentPath)
      };
      crumbs.unshift(crumb);
      const parentPath = path.dirname(currentPath);
      return parentPath;
    }, relativeVirtualRoot);

  crumbs.unshift(MakeRootCrumb(virtualRootParsed));
  return crumbs;
};

export const crumbFactory = {
  MakeCrumbs: MakeCrumbs
};
