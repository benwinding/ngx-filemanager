import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionButton } from '../actions-toolbars/ActionButton';
import { of, BehaviorSubject, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'actions-mini-browser',
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
            <mat-icon inline="true">{{ action.icon }}</mat-icon>
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
    `
  ],
  styleUrls: ['../shared-utility-styles.scss']
})
export class AppActionsMiniBrowserComponent implements OnInit {
  @Input()
  bulkActions: ActionButton[];
  @Output()
  clickedUpFolder = new EventEmitter<void>();
  @Output()
  clickedNewFolder = new EventEmitter<void>();

  @Input()
  $CurrentPathIsRoot: Observable<boolean>;

  ngOnInit() {
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
        label: 'New Folder',
        icon: 'create_new_folder',
        onClick: (item: ActionButton) => {
          this.clickedNewFolder.emit();
        },
        color: 'secondary',
        $disabled: of(false)
      }
    ];
  }
}
