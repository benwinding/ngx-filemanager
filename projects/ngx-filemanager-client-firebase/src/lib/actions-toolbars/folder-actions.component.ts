import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from './ActionButton';
import { of, BehaviorSubject, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'folder-actions',
  template: `
    <mat-toolbar>
      <mat-toolbar-row class="scroll-x">
        <div *ngFor="let action of bulkActions">
          <button
            class="action has-pointer"
            mat-raised-button
            [color]="action.color"
            (click)="action.onClick(action)"
            [disabled]="action.$disabled | async"
          >
            <mat-icon inline="true" >{{ action.icon }}</mat-icon>
            {{ action.label }}
          </button>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [
    `
      .has-pointer {
        cursor: pointer;
      }
      button.action {
        margin-right: 10px;
      }
      .flexr {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .scroll-x {
        overflow-x: auto;
      }
    `
  ]
})
export class AppFolderActionsComponent implements OnInit {
  @Input()
  bulkActions: ActionButton[];
  @Output()
  clickedUpFolder = new EventEmitter<void>();
  @Output()
  clickedRefresh = new EventEmitter<void>();
  @Output()
  clickedNewFolder = new EventEmitter<void>();
  @Output()
  clickedUploadFiles = new EventEmitter<void>();

  @Input()
  $CurrentPathIsRoot: Observable<boolean>;

  ngOnInit() {
    const $isRefreshing = new BehaviorSubject<boolean>(false);
    this.bulkActions = [
      {
        label: 'Back',
        icon: 'reply',
        onClick: (item: ActionButton) => {
          this.clickedUpFolder.emit();
        },
        color: 'secondary',
        $disabled: this.$CurrentPathIsRoot
      },
      {
        label: 'Upload Files',
        icon: 'file_upload',
        onClick: (item: ActionButton) => {
          this.clickedUploadFiles.emit();
        },
        color: 'secondary',
        $disabled: of(false)
      },
      {
        label: 'Refresh',
        icon: 'refresh',
        onClick: (item: ActionButton) => {
          $isRefreshing.next(true);
          setTimeout(() => {
            $isRefreshing.next(false);
          }, 1000);
          this.clickedRefresh.emit();
        },
        color: 'secondary',
        $disabled: $isRefreshing
      },
      {
        label: 'New Folder',
        icon: 'create_new_folder',
        onClick: (item: ActionButton) => {
          this.clickedNewFolder.emit();
        },
        color: 'secondary',
        $disabled: of(false)
      },
    ];
  }
}
