import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { CoreTypes } from '../../../core-types';
import { Subject, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { FileActionDefinition } from './FileActionDefinition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table',
  template: `
    <div class="files-viewer full-width">
      <div *ngIf="folders?.length" class="flex-row align-center">
        <mat-icon
          *ngIf="!areAllFoldersChecked"
          class="has-pointer color-white color-grey-hover"
          (click)="onCheckAllFolders()"
          >check_box_outline_blank</mat-icon
        >
        <mat-icon
          *ngIf="areAllFoldersChecked"
          class="has-pointer color-black color-grey-hover"
          (click)="onUnCheckAllFolders()"
          >check_box_outline</mat-icon
        >
        <h4 class="p5 m0 color-grey">Folders</h4>
      </div>
      <div class="flex-col">
        <card-folder
          *ngFor="let folder of folders"
          [folder]="folder"
          [checkedItems]="checkedItems"
          [selectedItem]="selectedItem"
          [actions]="folderActions"
          (enterFolder)="enterFolder.emit($event)"
        >
        </card-folder>
      </div>
      <div *ngIf="files?.length" class="flex-row align-center">
        <mat-icon
          *ngIf="!areAllFilesChecked"
          class="has-pointer color-white color-grey-hover"
          (click)="onCheckAllFiles()"
          >check_box_outline_blank</mat-icon
        >
        <mat-icon
          *ngIf="areAllFilesChecked"
          class="has-pointer color-black color-grey-hover"
          (click)="onUnCheckAllFiles()"
          >check_box_outline</mat-icon
        >
        <h4 class="p5 m0 color-grey">Files</h4>
      </div>
      <div class="flex-col">
        <card-file
          *ngFor="let file of files"
          [file]="file"
          [checkedItems]="checkedItems"
          [selectedItem]="selectedItem"
          [actions]="fileActions"
        >
        </card-file>
      </div>
      <div class="nothing-here" *ngIf="!files?.length && !folders.length">
        <p>
          No folders/files here
        </p>
      </div>
    </div>
  `,
  styleUrls: ['../shared-utility-styles.scss'],
  styles: [
    `
      .nothing-here {
        padding: 20px;
        padding-bottom: 100px;
        font-size: 1.2em;
        color: #777;
      }
      .files-viewer {
        min-height: 500px;
      }
    `
  ]
})
export class AppFileTableComponent implements OnInit, OnDestroy {
  checkedItems = new SelectionModel<string>(true);
  selectedItem = new SelectionModel<string>(false);

  clearSelected = new Subject();

  @Input()
  $triggerClearSelected: Observable<void>;
  @Input()
  fileActions: FileActionDefinition[];
  @Input()
  folderActions: FileActionDefinition[];
  @Input()
  files: CoreTypes.ResFile[];
  @Input()
  folders: CoreTypes.ResFile[];
  @Output()
  checkedChanged = new EventEmitter<CoreTypes.ResFile[]>();
  @Output()
  selectedChanged = new EventEmitter<string>();
  @Output()
  enterFolder = new EventEmitter<string>();

  private destroyed = new Subject();

  ngOnInit() {
    this.$triggerClearSelected
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.checkedItems.clear());
    this.checkedItems.changed.pipe(takeUntil(this.destroyed)).subscribe(() => {
      const folders = this.folders.filter(f =>
        this.checkedItems.selected.includes(f.fullPath)
      );
      const files = this.files.filter(f =>
        this.checkedItems.selected.includes(f.fullPath)
      );
      const checkedFiles = [...folders, ...files];
      this.checkedChanged.emit(checkedFiles);
    });
    this.selectedItem.changed.pipe(takeUntil(this.destroyed)).subscribe(() => {
      const [selectedFilePath] = this.selectedItem.selected;
      this.selectedChanged.emit(selectedFilePath);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  get areAllFoldersChecked(): boolean {
    const currentSelection = this.checkedItems.selected;
    const hasAllFoldersSelected = this.folders.every(f =>
      currentSelection.includes(f.fullPath)
    );
    return hasAllFoldersSelected;
  }

  get areAllFilesChecked(): boolean {
    const currentSelection = this.checkedItems.selected;
    const hasAllFilesSelected = this.files.every(f =>
      currentSelection.includes(f.fullPath)
    );
    return hasAllFilesSelected;
  }

  onCheckAllFolders() {
    this.checkedItems.select(...this.folders.map(f => f.fullPath));
  }
  onUnCheckAllFolders() {
    this.checkedItems.deselect(...this.folders.map(f => f.fullPath));
  }
  onCheckAllFiles() {
    this.checkedItems.select(...this.files.map(f => f.fullPath));
  }
  onUnCheckAllFiles() {
    this.checkedItems.deselect(...this.files.map(f => f.fullPath));
  }
}
