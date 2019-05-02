import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoreTypes, FileSystemProvider } from 'ngx-filemanager-core';
import { AutoTableConfig } from 'ngx-auto-table';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';

import { ActionHandlersService } from '../file-manager/action-handlers.service';
import { FileManagerConfig } from '../configuration/client-configuration';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table-mini-folder-browser',
  template: `
    <actions-mini-browser
      (clickedUpFolder)="onUpFolder()"
      (clickedNewFolder)="onNewFolder()"
      [$CurrentPathIsRoot]="$CurrentPathIsRoot"
    >
    </actions-mini-browser>
    <ngx-auto-table
      [config]="tableConfig"
      [columnDefinitions]="{
        icon: { template: iconTemplate },
        name: { template: nameTemplate, forceWrap: true },
        date: { template: dateTemplate }
      }"
    >
      <ng-template #iconTemplate let-row>
        <img
          class="icon"
          [class.greyed]="row.type === 'file'"
          [src]="row.icon"
          matTooltip="Click For Details"
        />
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
      .greyed {
        filter: grayscale(1);
      }
    `
  ],
  providers: [
    ActionHandlersService,
    ClientFileSystemService,
    OptimisticFilesystemService
  ]
})
export class AppFileTableMiniFolderBrowserComponent implements OnInit {
  @Input()
  serverFilesystem: FileSystemProvider;
  @Input()
  currentDirectory: string;
  @Input()
  config: FileManagerConfig;

  @Output()
  selectedDirectory = new EventEmitter<string>();

  tableConfig: AutoTableConfig<CoreTypes.ResFile>;

  constructor(
    private actionHandlers: ActionHandlersService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.actionHandlers.init(this.serverFilesystem, null);
    this.tableConfig = {
      data$: this.actionHandlers.$FilesWithIcons,
      onSelectItemDoubleClick: async (item: CoreTypes.ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          await this.actionHandlers.OnNavigateTo(item.fullPath);
        }
      },
      onSelectItem: (item: CoreTypes.ResFile) => {
        if (item.type === 'dir') {
          this.selectedDirectory.emit(item.fullPath);
        }
      }
    };
    this.tableConfig.hideFilter = true;
    this.tableConfig.hideChooseColumns = true;
    this.actionHandlers.OnNavigateTo(this.currentDirectory);
  }

  get $CurrentPathIsRoot() {
    return this.actionHandlers.$CurrentPathIsRoot;
  }

  async onUpFolder() {
    await this.actionHandlers.OnNavigateToParent();
    const selectedDirectory = await this.actionHandlers.GetCurrentPath();
    this.selectedDirectory.emit(selectedDirectory);
  }
  async onNewFolder() {
    this.logger.info('onClickNewFolder');
    return this.actionHandlers.OnNewFolderInCurrentDirectory();
  }
}
