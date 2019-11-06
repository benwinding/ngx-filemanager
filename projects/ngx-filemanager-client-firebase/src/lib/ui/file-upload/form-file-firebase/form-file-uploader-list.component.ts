import { EventEmitter, Component, Input, Output } from '@angular/core';
import { FormArrayFileObject } from './FormArrayFileObject';

@Component({
  selector: 'app-uploaded-files-list',
  template: `
    <p *ngIf="uploadedFiles?.length">Uploaded files:</p>
    <div>
      <div *ngFor="let file of uploadedFiles">
        <div class="full-width flex-h">
          <mat-icon id="i-done" *ngIf="!disabled && isDone(file)"
            >done</mat-icon
          >
          <img class="file-icon" image [src]="file['fileicon']" />
          <a class="full-width flex-h has-ellipsis" [href]="file.id" target="_blank">
            <span class="has-ellipsis">{{ file.value.name }}</span>
            <mat-icon class="i-open">open_in_new</mat-icon>
            <img
              *ngIf="file['imageurl']"
              class="file-thumb"
              image
              [src]="file['imageurl']"
            />
          </a>
          <mat-icon
            *ngIf="!disabled"
            class="has-pointer"
            (click)="this.clickRemoveTag.emit(file)"
            >cancel</mat-icon
          >
        </div>
        <div class="full-width">
          <mat-progress-bar
            class="progress"
            mode="determinate"
            [value]="getProgress(file)"
          ></mat-progress-bar>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
      .flex-h {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .has-pointer {
        cursor: pointer;
      }
      .file-link {
        display: flex;
        align-items: center;
      }
      .file-thumb,
      .file-icon {
        margin: 0px 10px;
        height: 30px;
      }
      .file-thumb {
        background-color: #ddd;
      }
      .i-open {
        font-size: 1em;
      }
      .has-ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
    const isDone = this.isDone(file);
    if (isDone) {
      return 100;
    }
    if (file && file.value && file.value.props) {
      const p = file.value.props.progress;
      return p * 0.95; // 95% until download completed
    }
    return 100;
  }

  isDone(file: FormArrayFileObject): boolean {
    if (file && file.value && file.value.props) {
      const c = file.value.props.completed;
      return c;
    }
    return false;
  }
}
