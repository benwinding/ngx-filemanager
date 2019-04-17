import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ResFile } from 'ngx-filemanager-core/public_api';
import { AutoTableConfig } from 'ngx-auto-table';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table',
  template: `
    <ngx-auto-table
      [config]="config"
      [columnDefinitions]="{
        icon: { template: iconTemplate },
        name: { template: nameTemplate, forceWrap: true },
        date: { template: dateTemplate }
      }"
      id="main-table"
    >
      <ng-template #iconTemplate let-row>
        <img class="icon" [src]="row.icon" matTooltip="Click For Details" />
      </ng-template>
      <ng-template #nameTemplate let-row>
        <div class="break-word" matTooltip="Click For Details">
          {{ row.name }}
        </div>
      </ng-template>
      <ng-template #sizeTemplate let-row>
        <div matTooltip="Click For Details">
          {{ row.size | fileSize }}
        </div>
      </ng-template>
      <ng-template #dateTemplate let-row>
        <div matTooltip="Click For Details">
          {{ row.date | date: 'short' }}
        </div>
      </ng-template>
      <ng-template #actionsTemplate let-row>
        <button
          mat-mini-fab
          color="primary"
          (click)="this.clickedDownload.emit(row)"
        >
          <mat-icon>launch</mat-icon>
        </button>
      </ng-template>
    </ngx-auto-table>
  `,
  styles: [
    `
      .icon {
        height: 35px;
      }
      .break-word {
        overflow-wrap: break-word;
        word-break: break-all;
      }
    `
  ]
})
export class AppFileTableComponent implements OnInit {
  @Input()
  config: AutoTableConfig<ResFile>;

  @Output()
  clickedDownload = new EventEmitter<ResFile>();

  ngOnInit() {
    this.setExplorerHeight('650px');
  }

  setExplorerHeight(heightVal: string) {
    const tableEl = document.getElementById('main-table');
    if (tableEl) {
      const containerDiv = tableEl.children.item(0) as HTMLDivElement;
      containerDiv.style.height = heightVal;
    }
  }
}
