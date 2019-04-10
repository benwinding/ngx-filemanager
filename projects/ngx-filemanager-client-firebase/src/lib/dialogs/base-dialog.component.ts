import { Component, Input } from '@angular/core';

// tslint:disable:component-selector
@Component({
  selector: 'base-dialog',
  template: `
    <div class="dialog-wrapper">
      <div class="header">
        <ng-container *ngTemplateOutlet="header"> </ng-container>
      </div>
      <div class="body">
        <ng-container *ngTemplateOutlet="body"> </ng-container>
      </div>
      <div class="actions">
        <ng-container *ngTemplateOutlet="actions"> </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-wrapper {
        max-height: 80vh;
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
  ]
})
export class BaseDialogComponent {
  @Input()
  header: any;
  @Input()
  body: any;
  @Input()
  actions: any;
}
