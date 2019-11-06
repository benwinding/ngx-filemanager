import { Component, Input } from '@angular/core';
import { CoreTypes } from '../../../core-types';
import { ActionDefinition } from 'ngx-auto-table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'card-file',
  template: `
    <div
      class="flex-row p5 space-between bg-grey-hover rounded"
      matTooltip="Click For Details"
      [class.bg-grey-light]="isChecked"
      [class.bg-grey-dark]="isSelected"
      (click)="onSelect()"
    >
      <div class="flex-row align-center">
        <mat-icon
          *ngIf="!isChecked"
          class="color-white color-grey-hover"
          (click)="onCheck()"
          >check_box_outline_blank</mat-icon
        >
        <mat-icon
          *ngIf="isChecked"
          class="color-black color-grey-hover"
          (click)="onUnCheck()"
          >check_box_outline</mat-icon
        >
        <img class="mr-10" width="30" [src]="file['icon']" />
        <div>
          <h5 class="m0 mb-5">{{ file.name }}</h5>
          <small class="m0 color-grey">{{ file.size | fileSize }}</small>
        </div>
      </div>
      <div class="flex-row align-center">
        <button
          mat-icon-button
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu"
        >
          <mat-icon>more_vert</mat-icon>
        </button>
      </div>
    </div>
    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let action of actions" (click)="action.onClick(file)">
        <mat-icon>{{ action.icon }}</mat-icon>
        <span>{{ action.label }}</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['../shared-utility-styles.scss'],
  styles: [``]
})
export class CardFileComponent {
  get isChecked(): boolean {
    return this.checkedItems.isSelected(this.file.fullPath);
  }
  get isSelected(): boolean {
    return this.selectedItem.isSelected(this.file.fullPath);
  }

  @Input()
  file: CoreTypes.ResFile;
  @Input()
  actions: ActionDefinition<CoreTypes.ResFile>[];
  @Input()
  checkedItems: SelectionModel<string>;
  @Input()
  selectedItem: SelectionModel<string>;

  onSelect() {
    this.selectedItem.select(this.file.fullPath);
  }
  onCheck() {
    this.checkedItems.select(this.file.fullPath);
  }
  onUnCheck() {
    this.checkedItems.deselect(this.file.fullPath);
  }
}
