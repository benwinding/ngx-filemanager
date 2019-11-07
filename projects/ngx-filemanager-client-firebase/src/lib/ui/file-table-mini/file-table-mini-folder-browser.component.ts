import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CoreTypes } from '../../../core-types';
import { Subject } from 'rxjs';
import { LoggerService } from '../../services/logging/logger.service';
import { ActionHandlersService } from '../main-file-manager/action-handlers.service';
import { ClientFileSystemService } from '../../services/pure/client-filesystem.service';
import { OptimisticFilesystemService } from '../../services/pure/optimistic-filesystem.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MainActionDefinition } from '../actions-toolbars/MainActionDefinition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file-table-mini-folder-browser',
  template: `
    <actions-mini-browser [mainActions]="mainActions"> </actions-mini-browser>
    <div class="full-width">
      <h4 class="p5 m0 color-grey">Folders</h4>
      <div class="flex-col">
        <card-folder
          *ngFor="let folder of folders"
          [folder]="folder"
          [selectedItem]="selectedItem"
          (enterFolder)="onEnterFolder($event)"
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
export class AppFileTableMiniFolderBrowserComponent
  implements OnInit, OnDestroy {
  selectedItem = new SelectionModel<string>(false);

  @Input()
  folders: CoreTypes.ResFile[];
  @Input()
  mainActions: MainActionDefinition[];
  @Output()
  enterDirectory = new EventEmitter<string>();
  @Output()
  selectedDirectory = new EventEmitter<string>();

  destroyed = new Subject();

  constructor(private logger: LoggerService) {}

  async ngOnInit() {
    this.selectedItem.changed.pipe(takeUntil(this.destroyed)).subscribe(() => {
      const selectedDir = this.selectedItem.selected[0];
      this.selectedDirectory.emit(selectedDir);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  async onEnterFolder(folderPath: string) {
    this.logger.info('onEnterFolder', { folderPath });
    this.enterDirectory.emit(folderPath);
    this.selectedDirectory.emit(folderPath);
  }
}
