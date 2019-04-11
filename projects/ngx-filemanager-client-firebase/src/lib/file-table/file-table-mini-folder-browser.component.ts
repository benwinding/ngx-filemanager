import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { AutoTableConfig } from 'ngx-auto-table';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table-mini-folder-browser',
  template: `
    <ngx-auto-table
      [config]="config"
      [columnDefinitions]="{
        icon: { template: iconTemplate },
        name: { template: nameTemplate, forceWrap: true },
        date: { template: dateTemplate }
      }"
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
  ],
  providers: [ClientFileSystemService, OptimisticFilesystemService]
})
export class AppFileTableMiniFolderBrowserComponent implements OnInit {
  @Input()
  serverFilesystem: FileSystemProvider;
  @Input()
  currentDirectory: string;

  @Output()
  clickedItem = new EventEmitter<ResFile>();
  @Output()
  clickedOk = new EventEmitter<ResFile>();

  config: AutoTableConfig<ResFile>;

  constructor(
    private clientFilesystem: ClientFileSystemService,
    private optimisticFs: OptimisticFilesystemService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.optimisticFs.initialize(this.serverFilesystem, this.clientFilesystem);
    this.config = {
      data$: this.optimisticFs.$FilesWithIcons,
      onSelectItemDoubleClick: async (item: ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          await this.optimisticFs.HandleList(item.fullPath);
          this.optimisticFs.selectFirstInCurrentDirectory();
        }
      }
    };
    this.optimisticFs.HandleList(this.currentDirectory);
  }
}
