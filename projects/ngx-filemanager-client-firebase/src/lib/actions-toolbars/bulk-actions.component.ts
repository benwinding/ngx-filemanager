import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from './ActionButton';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bulk-actions',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <div class="flexr">
          <div *ngFor="let action of bulkActions">
            <button
              class="action flexr"
              mat-raised-button
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
  styles: [
    `
      button.action {
        margin-right: 10px;
      }
      .flexr {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `
  ]
})
export class AppBulkActionsComponent implements OnInit {
  @Input()
  bulkActions: ActionButton[];
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

  ngOnInit() {
    this.bulkActions = [
      {
        label: 'Cancel',
        icon: 'clear',
        onClick: (item: ActionButton) => {
          this.clickedCancelBulk.emit();
        },
        color: 'secondary'
      },
      {
        label: 'Copy',
        icon: 'content_copy',
        onClick: (item: ActionButton) => {
          this.clickedBulkCopy.emit();
        },
        color: 'secondary'
      },
      {
        label: 'Move',
        icon: 'forward',
        onClick: (item: ActionButton) => {
          this.clickedBulkMove.emit();
        },
        color: 'secondary'
      },
      {
        label: 'Set Permissions',
        icon: 'lock_outline',
        onClick: (item: ActionButton) => {
          this.clickedBulkPermissions.emit();
        },
        color: 'secondary'
      },
      {
        label: 'Delete',
        icon: 'delete',
        onClick: (item: ActionButton) => {
          this.clickedBulkDelete.emit();
        },
        color: 'secondary'
      }
    ];
  }
}
