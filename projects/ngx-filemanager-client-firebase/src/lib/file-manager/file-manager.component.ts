import { OnInit, Component, Input } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/public_api';
import { take, map } from 'rxjs/operators';
import { ResFile, FileSystemProvider } from 'ngx-filemanager-core';
import { FileManagerConfig } from '../configuration/client-configuration';
import { Subject, BehaviorSubject } from 'rxjs';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { LoggerService } from '../logging/logger.service';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';
import { ActionHandlersService } from './action-handlers.service';

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
export class NgxFileManagerComponent implements OnInit {
  @Input()
  fileSystem: FileSystemProvider;
  @Input()
  config: FileManagerConfig;

  public autoTableConfig: AutoTableConfig<ResFile>;
  public isFileDetailsOpen = true;

  public $BulkSelected = new BehaviorSubject<ResFile[]>([]);
  private $triggerClearSelected = new Subject<void>();

  constructor(
    private actionHandlers: ActionHandlersService,
    private logger: LoggerService
  ) {}

  // Getters

  get $CurrentPath() {
    return this.actionHandlers.$CurrentPath;
  }

  get $CurrentPathIsRoot() {
    return this.actionHandlers.$CurrentPathIsRoot;
  }

  get $SelectedFile() {
    return this.actionHandlers.$SelectedFile;
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
    this.actionHandlers.init(this.fileSystem, this.config);
    this.makeConfig();
    if (this.config && this.config.virtualRoot) {
      this.actionHandlers.OnNavigateTo(this.config.virtualRoot);
    }
  }

  makeConfig() {
    this.autoTableConfig = {
      data$: this.actionHandlers.$FilesWithIcons,
      // debug: true,
      actionsBulk: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (files: ResFile[]) =>
            this.actionHandlers.OnCopyMultiple(files)
        }
      ],
      actions: [
        {
          label: 'Copy',
          icon: 'content_copy',
          onClick: async (file: ResFile) =>
            this.actionHandlers.OnCopyMultiple([file])
        },
        {
          label: 'Move',
          icon: 'forward',
          onClick: async (file: ResFile) =>
            this.actionHandlers.OnMoveMultiple([file])
        },
        {
          label: 'Rename',
          icon: 'border_color',
          onClick: async (file: ResFile) => this.actionHandlers.OnRename(file)
        },
        {
          label: 'Permissions',
          icon: 'lock_outline',
          onClick: async (file: ResFile) =>
            this.actionHandlers.OnSetPermissionsMultiple([file])
        },
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (file: ResFile) =>
            this.actionHandlers.OnDeleteMultiple([file])
        }
      ],
      onSelectedBulk: (files: ResFile[]) => {
        this.logger.info('onSelectedBulk', {
          files,
          length: files.length
        });
        this.$BulkSelected.next(files);
      },
      onSelectItemDoubleClick: async (item: ResFile) => {
        this.logger.info('onSelectItemDoubleClick!', { item });
        if (item.type === 'dir') {
          this.clearBulkSelected();
          this.actionHandlers.OnNavigateTo(item.fullPath);
        }
      },
      onSelectItem: (item: ResFile) => {
        this.logger.info('onSelectItem!', { item });
        this.actionHandlers.OnSelectItemByPath(item.fullPath);
      },
      $triggerSelectItem: this.$SelectedFile,
      $triggerClearSelected: this.$triggerClearSelected,
      filterText: 'Search here...',
      hideChooseColumns: true,
      hideFilter: true
    };
  }

  public async onDetailsClickDelete(file: ResFile) {
    await this.actionHandlers.OnDeleteMultiple([file]);
  }
  public async onDetailsClickDownload(file: ResFile) {
    await this.actionHandlers.OnDownloadFile(file);
  }
  public async onDetailsClickRename(file: ResFile) {
    await this.actionHandlers.OnRename(file);
  }
  public async onDetailsClickSinglePermissions(file: ResFile) {
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
