import { OnInit, Component, Input, OnDestroy } from '@angular/core';
import { take, map, takeUntil, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FileSystemProvider, CoreTypes } from '../../core-types';
import { LoggerService } from '../logging/logger.service';
import { ActionHandlersService } from './action-handlers.service';
import { AutoTableConfig } from 'ngx-auto-table';
import { ClientFileSystemService } from '../filesystem/pure/client-filesystem.service';
import { OptimisticFilesystemService } from '../filesystem/pure/optimistic-filesystem.service';
import { FileManagerConfig } from '../configuration/client-configuration';
import { FilemanagerStatusService } from '../filesystem/state/status.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-filemanager',
  templateUrl: 'file-manager.component.html',
  styleUrls: ['file-manager.component.scss', '../shared-utility-styles.scss'],
  providers: [
    ActionHandlersService,
    ClientFileSystemService,
    OptimisticFilesystemService
  ]
})
export class NgxFileManagerComponent implements OnInit, OnDestroy {
  @Input()
  fileSystem: FileSystemProvider;
  @Input()
  config: FileManagerConfig;

  public autoTableConfig: AutoTableConfig<CoreTypes.ResFile>;
  public isFileDetailsOpen = true;

  public $BulkSelected = new BehaviorSubject<CoreTypes.ResFile[]>([]);
  private $triggerClearSelected = new Subject<void>();

  public initLoaded;
  public requestMap;

  $CurrentPath: Observable<string>;
  $CurrentPathIsRoot: Observable<boolean>;
  SelectedFile: CoreTypes.ResFile;

  destroyed = new Subject();

  constructor(
    private actionHandlers: ActionHandlersService,
    private logger: LoggerService,
    private status: FilemanagerStatusService
  ) {
    this.requestMap = this.status.ActiveRequestsMap;
  }

  // Getters

  get $status() {
    return this.status.ActiveRequestsMap.pipe(
      map(requests => {
        return Object.keys(requests).map(k => requests[k].status);
      })
    );
  }

  get $hasSending() {
    return this.$status.pipe(
      map(s => !!s.find(status => status === 'SENDING'))
    );
  }

  get $hasFailed() {
    return this.$status.pipe(map(s => !!s.find(status => status === 'FAILED')));
  }

  async ngOnInit() {
    if (!this.fileSystem) {
      throw new Error(
        '<ngx-filemanager> must have input selector [fileSystem] set'
      );
    }
    if (!this.config) {
      throw new Error(
        '<ngx-filemanager> must have input selector [config] set'
      );
    }
    if (!this.config.virtualRoot) {
      console.warn(
        '<ngx-filemanager> warning config.virtualRoot not set, using bucket root "/"'
      );
      this.config.virtualRoot = '/';
    }
    if (!this.config.initialPath) {
      console.warn(
        '<ngx-filemanager> warning config.initialPath not set, using virtualRoot: ' +
          this.config.virtualRoot
      );
      this.config.initialPath = this.config.virtualRoot;
    }
    await this.actionHandlers.init(this.fileSystem, this.config);
    await this.actionHandlers.OnNavigateTo(this.config.virtualRoot);
    this.$CurrentPath = this.actionHandlers.$CurrentPath;
    this.$CurrentPathIsRoot = this.actionHandlers.$CurrentPathIsRoot;
    this.actionHandlers.$SelectedFile.pipe(takeUntil(this.destroyed), tap(selectedFile => {
      console.log('this.$SelectedFile.pipe', { selectedFile });
      this.SelectedFile = null;
      setTimeout(() => {
        this.SelectedFile = selectedFile;
      });
    })).subscribe();
    this.makeConfig();
    this.initLoaded = true;
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  makeConfig() {
    this.autoTableConfig = {
      data$: this.actionHandlers.$FilesWithIcons,
      // debug: true,
      actionsBulk: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (files: CoreTypes.ResFile[]) =>
            this.actionHandlers.OnCopyMultiple(files)
        }
      ],
      actions: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (file: CoreTypes.ResFile) =>
            this.actionHandlers.OnCopyMultiple([file])
        },
        {
          label: 'Move',
          icon: 'forward',
          onClick: async (file: CoreTypes.ResFile) =>
            this.actionHandlers.OnMoveMultiple([file])
        },
        {
          label: 'Rename',
          icon: 'border_color',
          onClick: async (file: CoreTypes.ResFile) =>
            this.actionHandlers.OnRename(file)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (file: CoreTypes.ResFile) =>
            this.actionHandlers.OnSetPermissionsMultiple([file])
        },
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: CoreTypes.ResFile) =>
            this.actionHandlers.OnDeleteMultiple([file])
        }
      ],
      onSelectedBulk: (files: CoreTypes.ResFile[]) => {
        this.logger.info('onSelectedBulk', {
          files,
          length: files.length
        });
        this.$BulkSelected.next(files);
      },
      onSelectItemDoubleClick: async (item: CoreTypes.ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.clearBulkSelected();
          return this.actionHandlers.OnNavigateTo(item.fullPath);
        }
      },
      onSelectItem: (item: CoreTypes.ResFile) => {
        this.logger.info('onSelectItem!', { item });
        return this.actionHandlers.OnSelectItemByPath(item.fullPath);
      },
      $triggerSelectItem: this.actionHandlers.$SelectedFile,
      $triggerClearSelected: this.$triggerClearSelected,
      filterText: 'Search here...',
      hideChooseColumns: true,
      hideFilter: true,
      initialSort: 'name'
    };
  }

  public async onDetailsClickDelete(file: CoreTypes.ResFile) {
    await this.actionHandlers.OnDeleteMultiple([file]);
  }
  public async onDetailsClickDownload(file: CoreTypes.ResFile) {
    await this.actionHandlers.OnDownloadFile(file);
  }
  public async onDetailsClickRename(file: CoreTypes.ResFile) {
    await this.actionHandlers.OnRename(file);
  }
  public async onDetailsClickSinglePermissions(file: CoreTypes.ResFile) {
    await this.actionHandlers.OnSetPermissionsMultiple([file]);
    await this.actionHandlers.OnSelectItemByPath(file.fullPath);
  }

  public async onClickNewFolder() {
    return this.actionHandlers.OnNewFolderInCurrentDirectory();
  }

  public async onClickUpFolder() {
    return this.actionHandlers.OnNavigateToParent();
  }

  public async onClickUploadFiles() {
    return this.actionHandlers.OnUploadFilesToCurrentDirectory();
  }

  public async onClickRefresh() {
    return this.actionHandlers.RefreshExplorer();
  }

  public async onClickedCancelBulk() {
    this.logger.info('onClickCancelBulk');
    this.clearBulkSelected();
  }

  public async onClickedBulkCopy() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    const selectedCopied = [...selected];
    this.logger.info('clickedBulkCopy', { selectedCopied });
    await this.actionHandlers.OnCopyMultiple(selectedCopied);
    this.clearBulkSelected();
  }

  public async onClickedBulkMove() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    this.logger.info('clickedBulkMove', { selected });
    await this.actionHandlers.OnMoveMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickedBulkDelete() {
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    this.clearBulkSelected();
    return this.actionHandlers.OnDeleteMultiple(selected);
  }

  public async onClickedBulkPermissions() {
    this.logger.info('clickedBulkPermissions');
    const selected = await this.$BulkSelected.pipe(take(1)).toPromise();
    await this.actionHandlers.OnSetPermissionsMultiple(selected);
    this.clearBulkSelected();
  }

  public async onClickCrumb(newPath: string) {
    this.clearBulkSelected();
    this.logger.info('onClickCrumb', { newPath });
    return this.actionHandlers.OnNavigateTo(newPath);
  }

  private clearBulkSelected() {
    this.$triggerClearSelected.next();
    this.$BulkSelected.next([]);
  }
}
