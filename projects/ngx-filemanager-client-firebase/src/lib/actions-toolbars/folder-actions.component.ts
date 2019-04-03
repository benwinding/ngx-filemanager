import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from './ActionButton';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'folder-actions',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <div *ngFor="let action of bulkActions">
          <button
            class="action"
            mat-raised-button
            [color]="action.color"
            (click)="action.onClick(action)"
          >
            <mat-icon>{{ action.icon }}</mat-icon>
            {{ action.label }}
          </button>
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
export class AppFolderActionsComponent implements OnInit {
  @Input()
  bulkActions: ActionButton[];
  @Output()
  clickedNewFolder = new EventEmitter<void>();
  @Output()
  clickedUpFolder = new EventEmitter<void>();

  ngOnInit() {
    this.bulkActions = [
      {
        label: 'Back',
        icon: 'arrow_left',
        onClick: (item: ActionButton) => {
          this.clickedUpFolder.emit();
        },
        color: 'secondary'
      },
      {
        label: 'New Folder',
        icon: 'create_new_folder',
        onClick: (item: ActionButton) => {
          this.clickedNewFolder.emit();
        },
        color: 'secondary'
      }
    ];
  }
}
