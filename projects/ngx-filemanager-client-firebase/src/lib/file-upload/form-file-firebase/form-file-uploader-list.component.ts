import { EventEmitter, Component, Input, Output } from '@angular/core';
import { FormArrayFileObject } from './FormArrayFileObject';

@Component({
  selector: 'app-uploaded-files-list',
  template: `
    <p>Uploaded files:</p>
    <div class="file-list">
      <div class="file-row" *ngFor="let file of uploadedFiles">
        <img class="file-icon" image [src]="file['fileicon']" />
        <a class="file-link has-ellipsis" [href]="file.id" target="_blank">
          <span class="file-linkname">{{ file.value.name }}</span>
          <mat-icon class="i-open">open_in_new</mat-icon>
          <img
            *ngIf="file['imageurl']"
            class="file-thumb"
            image
            [src]="file['imageurl']"
          />
        </a>
        <mat-icon
          id="i-delete"
          *ngIf="!disabled"
          class="has-pointer"
          (click)="this.clickRemoveTag.emit(file)"
          >cancel</mat-icon
        >
        <mat-progress-bar
          class="progress"
          mode="determinate"
          [value]="getProgress(file)"
        ></mat-progress-bar>
      </div>
    </div>
  `,
  styles: [
    `
      .file-list {
        width: 100%;
      }
      .file-row {
        display: grid;
        align-items: center;
        grid-template-columns: min-content auto min-content;
      }
      #i-delete {
        float: right;
      }
      .file-title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .file-link {
        display: flex;
        align-items: center;
      }
      .file-linkname {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .file-thumb,
      .file-icon {
        margin: 0px 10px;
        height: 30px;
      }
      .file-thumb {
        background-color: darkgrey;
      }
      .i-open {
        font-size: 1em;
      }
      .progress {
        grid-column: 1 / span 3;
      }
    `
  ]
})
export class FormFileUploadedFileListComponent {
  @Input()
  disabled: boolean;
  @Input()
  uploadedFiles: FormArrayFileObject[] = [];
  @Output()
  clickRemoveTag = new EventEmitter<FormArrayFileObject>();

  getProgress(file: FormArrayFileObject) {
    if (file && file.value && file.value.props) {
      return file.value.props.progress;
    }
    return 100;
  }
}
