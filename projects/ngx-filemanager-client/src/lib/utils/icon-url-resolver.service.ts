import { guesser } from './file-icon-guesser';
import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import * as path from 'path-browserify';

@Injectable()
export class IconUrlResolverService {
  iconAssetDirectory = '/assets/fileicons/';
  constructor(@Inject(APP_BASE_HREF) private baseHref: string) {}

  getFileIconUrl(filename: string) {
    return path.join(
      this.baseHref,
      this.iconAssetDirectory,
      guesser.getFileIconName(filename) + '.svg'
    );
  }
  getFolderIconUrl(filename: string) {
    return path.join(
      this.baseHref,
      this.iconAssetDirectory,
      guesser.getFolderIconName(filename) + '.svg'
    );
  }
}
