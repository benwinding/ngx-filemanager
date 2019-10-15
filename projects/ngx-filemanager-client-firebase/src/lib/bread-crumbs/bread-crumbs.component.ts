import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LoggerService } from '../logging';
import { FileManagerConfig } from '../configuration';
import { crumbFactory, BreadCrumb } from './crumb-factory';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bread-crumbs',
  template: `
    <div class="flex-row align-center">
      <div
        class="flex-row align-center"
        *ngFor="let crumb of crumbs; let first = first; let last = last"
      >
        <div class="divider" *ngIf="!first">
          >
        </div>
        <button
          #myButton
          class="crumb"
          mat-raised-button
          color="secondary"
          [disabled]="last"
          (click)="onClickCrumb(crumb); myButton.disabled = true"
        >
          <mat-icon *ngIf="crumb.icon">{{ crumb.icon }}</mat-icon>
          {{ crumb.label }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppBreadCrumbsComponent {
  crumbs: BreadCrumb[];

  @Output()
  clickedCrumb = new EventEmitter<string>();

  _currentPath: string;
  @Input()
  set currentPath(newPath) {
    this._currentPath = newPath;
    this.makeCrumbs(newPath);
  }
  _config: FileManagerConfig;
  @Input()
  set config(newConfig) {
    this._config = newConfig;
    this.makeCrumbs(this._currentPath);
  }

  constructor(private logger: LoggerService) {}

  private makeCrumbs(newPath: string) {
    if (!this._config) {
      return;
    }
    const virtualRoot = this._config.virtualRoot;
    this.crumbs = crumbFactory.MakeCrumbs(virtualRoot, newPath || virtualRoot);

    this.logger.info('makeCrumbs', {
      crumbs: this.crumbs,
      virtualRoot,
      newPath
    });
  }

  onClickCrumb(crumb: BreadCrumb) {
    this.logger.info('onClickCrumb', { crumb });
    this.clickedCrumb.emit(crumb.path);
  }
}
