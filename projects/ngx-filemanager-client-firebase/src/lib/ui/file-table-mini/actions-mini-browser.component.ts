import { Component, Input } from '@angular/core';
import { MainActionDefinition } from '../actions-toolbars/MainActionDefinition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'actions-mini-browser',
  template: `
    <mat-toolbar *ngIf="this.mainActions">
      <mat-toolbar-row class="top-toolbar">
        <span class="top-toolbar-label">
          Actions
        </span>
      </mat-toolbar-row>
      <mat-toolbar-row class="scroll-x">
        <div *ngFor="let action of mainActions">
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
export class AppActionsMiniBrowserComponent {
  @Input()
  mainActions: MainActionDefinition[];
}
