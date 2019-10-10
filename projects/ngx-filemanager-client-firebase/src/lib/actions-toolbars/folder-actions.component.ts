import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from './ActionButton';
import { of, BehaviorSubject, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'folder-actions',
  template: `
    <mat-toolbar>
      <mat-toolbar-row class="scroll-x">
        <div *ngFor="let action of actions">
          <button
            class="mr-10 has-pointer"
            mat-raised-button
            [color]="action.color"
            (click)="action.onClick(action)"
            [disabled]="action.$disabled | async"
          >
            <mat-icon inline="true">{{ action.icon }}</mat-icon>
            {{ action.label }}
          </button>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppFolderActionsComponent implements OnInit {
  @Input()
  $CurrentPathIsRoot: Observable<boolean>;
  @Output()
  clickedUpFolder = new EventEmitter<void>();
  @Output()
  clickedRefresh = new EventEmitter<void>();
  @Output()
  clickedNewFolder = new EventEmitter<void>();
  @Output()
  clickedUploadFiles = new EventEmitter<void>();

  actions: ActionButton[];

  ngOnInit() {
    const $isRefreshing = new BehaviorSubject<boolean>(false);
    this.actions = [];
    const addAction = (
      label: string,
      icon: string,
      onClick: (item: ActionButton) => void,
      disabled?: Observable<boolean>
    ) => {
      this.actions.push({
        label,
        icon,
        color: null,
        onClick: (item: ActionButton) => onClick(item),
        $disabled: disabled || of(false)
      });
    };

    addAction(
      'Back',
      'reply',
      (item: ActionButton) => {
        this.clickedUpFolder.emit();
      },
      this.$CurrentPathIsRoot
    );
    addAction(
      'Refresh',
      'refresh',
      (item: ActionButton) => {
        $isRefreshing.next(true);
        setTimeout(() => {
          $isRefreshing.next(false);
        }, 1000);
        this.clickedRefresh.emit();
      },
      $isRefreshing
    );
    addAction('Upload Files', 'file_upload', (item: ActionButton) => {
      this.clickedUploadFiles.emit();
    });
    addAction('New Folder', 'create_new_folder', (item: ActionButton) => {
      this.clickedNewFolder.emit();
    });
  }
}
