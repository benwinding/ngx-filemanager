import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BucketObject } from './BucketTypes';
import { getFileIconName } from 'src/app/subcomponents/doc-viewer/file-icon';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface FileDisplayed {
  ref: BucketObject;
  name: string;
  icon: string;
  modified_iso: string;
  isDir: boolean;
}

function translateBucketFile(f: BucketObject): FileDisplayed {
  return {
    ref: f,
    name: f.name,
    icon: getFileIconName(f.name),
    modified_iso: f.customMeta.modified_on_iso,
    isDir: f.isDir
  };
}

@Component({
  selector: 'app-file-explorer',
  template: `
    <div>
      <div
        *ngFor="let file of filesTranslated | async"
        class="file-row"
        (click)="onClickFile(file)"
      >
        <div class="filename">{{ file.name }}</div>
        <div class="icon">
          <img [src]="file.icon" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .file-row {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 2em;
      }
      .filename {
        font-size: 1.2em;
      }
      .icon {
        height: 1em;
        width: 1em;
      }
    `
  ]
})
export class FileExplorerComponent implements OnInit {
  @Input()
  files: Observable<BucketObject[]>;
  @Output()
  selectedFile = new EventEmitter<BucketObject>();

  filesTranslated: Observable<FileDisplayed[]>;

  ngOnInit() {
    if (!this.files) {
      throw new Error('attribute [files] has not been set');
    }
    this.filesTranslated = this.files.pipe(map(files => {
      return files.map(f => translateBucketFile(f));
    }));
  }

  onClickFile(file: FileDisplayed) {
    this.selectedFile.emit(file.ref);
  }
}
