import { Component, Input } from '@angular/core';
import { MainActionDefinition } from './MainActionDefinition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-actions',
  template: `
    <mat-toolbar>
      <mat-toolbar-row class="scroll-x">
        <div *ngFor="let action of mainActions">
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
export class AppMainActionsComponent {
  @Input()
  mainActions: MainActionDefinition[];
}
