import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-csv-export',
  template: `
    <a
      *ngIf="dataArray"
      csvLink
      [data]="dataArray"
      [filename]="filename"
      mat-raised-button
    >
      <mat-icon title="Export as CSV">file_download</mat-icon>
      <span>Export CSV</span>
    </a>
  `,
  styles: [
    `
      a {
        color: black;
      }
      mat-icon {
        padding-right: 5px;
      }
    `
  ]
})
export class AppExportCsvExportComponent {
  @Input()
  dataArray: [];
  @Input()
  filename: string;
}
