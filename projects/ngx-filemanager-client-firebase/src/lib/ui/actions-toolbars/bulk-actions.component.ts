import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BulkActionDefinition } from './BulkActionDefinition';
import { CoreTypes } from '../../../core-types';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bulk-actions',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row class="scroll-x">
        <div class="flex-row" *ngIf="bulkSelected$ | async as selected">
          <div *ngFor="let action of bulkActions">
            <button
              class="mr-10 flex-row align-center"
              mat-raised-button
              [disabled]="action.$disabled | async"
              [color]="action.color"
              (click)="executeAction(action, selected)"
            >
              <mat-icon>{{ action.icon }}</mat-icon>
              {{ action.label }}
            </button>
          </div>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppBulkActionsComponent {
  @Input()
  bulkActions: BulkActionDefinition[];
  @Input()
  bulkSelected$: Observable<CoreTypes.ResFile[]>;
  @Output()
  clearSelected = new EventEmitter<void>();

  async executeAction(action: BulkActionDefinition, selected: CoreTypes.ResFile[]) {
    await action.onClick(selected);
    this.clearSelected.emit();
  }
}
