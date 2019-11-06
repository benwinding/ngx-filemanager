import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from './ActionButton';
import { Observable, of } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bulk-actions',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row class="scroll-x">
        <div class="flex-row">
          <div *ngFor="let action of bulkActions">
            <button
              class="mr-10 flex-row align-center"
              mat-raised-button
              [disabled]="action.$disabled | async"
              [color]="action.color"
              (click)="action.onClick(action)"
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
export class AppBulkActionsComponent implements OnInit {
  @Input()
  isAdmin: boolean;
  @Output()
  clickedCancelBulk = new EventEmitter<void>();
  @Output()
  clickedBulkCopy = new EventEmitter<void>();
  @Output()
  clickedBulkMove = new EventEmitter<void>();
  @Output()
  clickedBulkPermissions = new EventEmitter<void>();
  @Output()
  clickedBulkDelete = new EventEmitter<void>();

  bulkActions: ActionButton[];

  ngOnInit() {
    this.bulkActions = [];
    const addBulk = (
      label: string,
      icon: string,
      onClick: (item: ActionButton) => void,
      $disabled?: Observable<boolean>
    ) => {
      this.bulkActions.push({
        label,
        icon,
        color: null,
        onClick: (item: ActionButton) => onClick(item),
        $disabled: $disabled || of(false)
      });
    };

    addBulk('Cancel', 'clear', (item: ActionButton) => {
      this.clickedCancelBulk.emit();
    });
    addBulk('Copy', 'content_copy', (item: ActionButton) => {
      this.clickedBulkCopy.emit();
    });
    addBulk('Move', 'forward', (item: ActionButton) => {
      this.clickedBulkMove.emit();
    });
    addBulk('Set Permissions', 'lock_outline', (item: ActionButton) => {
      this.clickedBulkPermissions.emit();
    }, of(!this.isAdmin));
    addBulk('Delete', 'delete', (item: ActionButton) => {
      this.clickedBulkDelete.emit();
    });
  }
}
