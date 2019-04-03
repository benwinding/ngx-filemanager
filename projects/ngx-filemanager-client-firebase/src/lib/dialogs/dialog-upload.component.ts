import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface RenameDialogInterface {
  currentPath: string;
}

interface UploadConfig {
  multiple: boolean;
  formatsAllowed: string;
  maxSize: string;
  uploadAPI: {
    url: string;
    headers: {
      [a: string]: string;
    };
  };
  theme: string;
  hideProgressBar: boolean;
  hideResetBtn: boolean;
  hideSelectBtn: boolean;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager-upload-files-dialog',
  template: `
    <div class="dialog">
      <h2>Upload Files</h2>
      <h5>To Folder: {{ data.currentPath }}</h5>
      <form (submit)="onSubmit()">
        <angular-file-uploader [config]="afuConfig"> </angular-file-uploader>
        <!--
          <input
            matInput
            [(ngModel)]="renamedItem"
            [ngModelOptions]="{ standalone: true }"
          />
        -->
      </form>
    </div>
    <btns-cancel-ok
      okIcon="done"
      okText="Rename Folder"
      (clickedCancel)="onCancel($event)"
      (clickedOk)="onSubmit()"
    >
    </btns-cancel-ok>
  `,
  styles: [
    `
      .flexRow {
        display: flex;
        flex-direction: row;
      }
      form {
        max-height: 50vh;
        overflow-y: scroll;
      }
      .dialog {
        max-height: 80vh;
        overflow: hidden;
      }
    `
  ]
})
export class AppDialogUploadFilesComponent implements OnInit {
  renamedItem = '';
  afuConfig = {
    multiple: true,
    theme: 'dragNDrop',
    hideResetBtn: true,
    uploadAPI: {
      url: 'https://example-file-upload-api'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<AppDialogUploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameDialogInterface
  ) {
    this.renamedItem = data.currentPath;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setStyles();
    });
  }

  setStyles() {
    const btnSelectStyle = (document.querySelector(
      '.afu-select-btn'
    ) as HTMLElement).style;
    btnSelectStyle.backgroundColor = 'grey';
    btnSelectStyle.padding = '8px 15px';
    btnSelectStyle.borderRadius = '4px';
    btnSelectStyle.fontFamily = 'sans-serif';
    btnSelectStyle.fontSize = '0.9em';
    btnSelectStyle.cursor = 'pointer';
    btnSelectStyle['webkitBoxShadow'] = 'rgba(0, 0, 0, 0.75) 0px 1px 5px -1px';
    btnSelectStyle.boxShadow = 'rgba(0, 0, 0, 0.75) 0px 1px 5px -1px';
  }

  onSubmit() {
    this.dialogRef.close();
  }
  onCancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
