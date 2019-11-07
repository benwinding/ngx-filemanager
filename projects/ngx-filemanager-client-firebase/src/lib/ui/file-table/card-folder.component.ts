import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CoreTypes } from '../../../core-types';
import { FileActionDefinition } from './FileActionDefinition';

@Component({
  selector: 'card-folder',
  template: `
    <div
      class="flex-row p5 space-between bg-grey-hover rounded"
      matTooltip="Click For Details"
      [class.bg-grey-light]="isChecked"
      [class.bg-grey-dark]="isSelected"
      (click)="onSelect()"
      (dblclick)="onDoubleClick()"
    >
      <div class="flex-row align-center">
        <div *ngIf="checkedItems">
          <mat-icon
            *ngIf="!isChecked"
            class="has-pointer color-white color-grey-hover"
            (click)="onCheck()"
            >check_box_outline_blank</mat-icon
          >
          <mat-icon
            *ngIf="isChecked"
            class="has-pointer color-black color-grey-hover"
            (click)="onUnCheck()"
            >check_box_outline</mat-icon
          >
        </div>
        <img class="mr-10" width="30" [src]="folder['icon']" />
        <div>
          <h5 class="m0 mb-5 has-ellipsis">{{ folder.name }}</h5>
          <small class="m0 color-grey">{{ folder.size | fileSize }}</small>
        </div>
      </div>
      <button
        *ngIf="actions"
        mat-icon-button
        [matMenuTriggerFor]="menu"
        aria-label="Example icon-button with a menu"
      >
        <mat-icon>more_vert</mat-icon>
      </button>
    </div>
    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let action of actions"
        (click)="action.onClick(folder)"
      >
        <mat-icon [color]="action.color">{{ action.icon }}</mat-icon>
        <span>{{ action.label }}</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['../shared-utility-styles.scss'],
  styles: [``]
})
export class CardFolderComponent {
  get isChecked(): boolean {
    if (!this.checkedItems) {
      return;
    }
    return this.checkedItems.isSelected(this.folder.fullPath);
  }
  get isSelected(): boolean {
    return this.selectedItem.isSelected(this.folder.fullPath);
  }
  @Input()
  folder: CoreTypes.ResFile;
  @Input()
  actions: FileActionDefinition[];
  @Input()
  checkedItems: SelectionModel<string>;
  @Input()
  selectedItem: SelectionModel<string>;
  @Output()
  enterFolder = new EventEmitter<string>();

  onSelect() {
    this.selectedItem.select(this.folder.fullPath);
  }
  onCheck() {
    this.checkedItems.select(this.folder.fullPath);
  }
  onUnCheck() {
    this.checkedItems.deselect(this.folder.fullPath);
  }
  onDoubleClick() {
    console.log('onDoubleClick!');
    this.enterFolder.emit(this.folder.fullPath);
  }
}
