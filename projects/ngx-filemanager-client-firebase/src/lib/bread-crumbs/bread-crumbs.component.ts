import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LoggerService } from '../logging/logger.service';

interface BreadCrumb {
  label: string;
  path?: string;
}

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
          (click)="this.clickedCrumb.emit(crumb.path); myButton.disabled = true"
        >
          {{ crumb.label }}
        </button>
      </div>
    </div>
  `,
  styleUrls: [
    '../shared-utility-styles.scss'
  ]
})
export class AppBreadCrumbsComponent {
  private _currentPath: string;
  crumbs: BreadCrumb[];

  @Output()
  clickedCrumb = new EventEmitter<string>();

  @Input()
  set currentPath(newPath) {
    const parsed = newPath ? newPath : '';
    this._currentPath = parsed;
    this.makeCrumbs(parsed);
  }

  constructor(private logger: LoggerService) {}

  private makeCrumbs(newPath: string) {
    const segments = newPath.split('/').filter(s => s !== '');
    this.crumbs = [];
    segments.reduce((segmentsSoFar, cur) => {
      segmentsSoFar.push(cur);
      const crumbPath = segmentsSoFar.join('/') + '/';
      this.crumbs.push({
        label: cur,
        path: crumbPath
      });
      return segmentsSoFar;
    }, []);
    this.crumbs.unshift({
      label: 'Home',
      path: '/'
    });
    this.logger.info('makeCrumbs', {
      crumbs: this.crumbs,
      segments,
      newPath
    });
  }
}
