import { Component, Input } from '@angular/core';

// tslint:disable:component-selector
@Component({
  selector: 'base-dialog',
  template: `
    <div class="dialog-wrapper">
      <div class="header sans-serif flex-col align-center">
        <ng-container *ngTemplateOutlet="header"> </ng-container>
      </div>
      <div class="body sans-serif flex-col align-center">
        <ng-container *ngTemplateOutlet="body"> </ng-container>
      </div>
      <div class="actions sans-serif flex-col align-center">
        <ng-container *ngTemplateOutlet="actions"> </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-wrapper {
        max-height: 80vh;
        min-width: 400px;
      }
      .header {
      }
      .body {
        overflow-y: auto;
        max-height: 60vh;
      }
      .actions {
        max-height: 200px;
      }
    `
  ],
  styleUrls: ['../shared-utility-styles.scss']
})
export class BaseDialogComponent {
  @Input()
  header: any;
  @Input()
  body: any;
  @Input()
  actions: any;
}
