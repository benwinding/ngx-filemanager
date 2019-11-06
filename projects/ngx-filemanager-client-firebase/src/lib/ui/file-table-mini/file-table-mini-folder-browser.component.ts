import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoreTypes } from '../../../core-types';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '../../services/logging/logger.service';
import { ActionHandlersService } from '../file-manager/action-handlers.service';
import { FileManagerConfig } from '../../configuration/client-configuration';
import { ClientFileSystemService } from '../../services/pure/client-filesystem.service';
import { OptimisticFilesystemService } from '../../services/pure/optimistic-filesystem.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

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
    <div class="full-width">
      <h4 class="p5 m0 color-grey">Folders</h4>
      <div class="flex-col">
        <card-folder
          *ngFor="let folder of folders"
          [folder]="folder"
          [selectedItem]="selectedItem"
          (enterFolder)="onEnterFolder($event)"
          (selectedItem)="onSelectFolder($event)"
        >
        </card-folder>
      </div>
    </div>
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
  selectedItem = new SelectionModel<string>(false);

  @Input()
  currentDirectory: string;
  @Input()
  config: FileManagerConfig;
  @Input()
  $CurrentPathIsRoot: Observable<boolean>;
  @Input()
  actionHandlers: ActionHandlersService;

  @Output()
  selectedDirectory = new EventEmitter<string>();

  folders: CoreTypes.ResFile[];

  destroyed = new Subject();

  constructor(private logger: LoggerService) {}

  async ngOnInit() {
    this.actionHandlers.$FilesWithIcons
      .pipe(takeUntil(this.destroyed))
      .subscribe(fileItems => {
        this.folders = fileItems.filter(f => f.type === 'dir');
      });
    return this.actionHandlers.OnNavigateTo(this.currentDirectory);
  }

  async onSelectFolder(folderPath: string) {
    this.selectedDirectory.emit(folderPath);
  }

  async onEnterFolder(folderPath: string) {
    return this.actionHandlers.OnNavigateTo(folderPath);
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
