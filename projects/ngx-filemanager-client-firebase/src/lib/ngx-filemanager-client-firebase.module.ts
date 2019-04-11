import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoTableModule } from 'ngx-auto-table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSidenavModule,
  MatDialogModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { FileDetailsComponent } from './file-details/file-details.component';
import { FileSizePipe } from './utils/file-size.pipe';
import { ServerFilesystemProviderService } from './filesystem/server-filesystem.service';
import { ClientFileSystemService } from './filesystem/client-filesystem.service';
import { OptimisticFilesystemService } from './filesystem/optimistic-filesystem.service';

import { AppFileTableComponent } from './file-table/file-table.component';
import { AppBreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { AppBulkActionsComponent } from './actions-toolbars/bulk-actions.component';
import { AppFolderActionsComponent } from './actions-toolbars/folder-actions.component';
import { NgxFileManagerComponent } from './file-manager/file-manager.component';

import { BaseDialogComponent } from './dialogs/base-dialog.component';
import { AppBtnsCancelOkComponent } from './dialogs/btns-cancel-ok.component';
import { AppDialogUploadFilesComponent } from './dialogs/dialog-upload.component';
import { AppDialogRenameComponent } from './dialogs/dialog-rename.component';
import { AppDialogNewFolderComponent } from './dialogs/dialog-new-folder.component';
import { AppDialogSetPermissionsComponent } from './dialogs/dialog-setpermissions.component';
import { AppDialogCopyComponent } from './dialogs/dialog-copy.component';
import { AppDialogMoveComponent } from './dialogs/dialog-move.component';
import { LoggerService } from './logging/logger.service';
import { ConsoleLoggerService } from './logging/console-logger.service';
import { AppFileTableMiniFolderBrowserComponent } from './file-table/file-table-mini-folder-browser.component';
import { AppActionsMiniBrowserComponent } from './actions-toolbars/actions-mini-browser.component';

const dialogComponents = [
  BaseDialogComponent,
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogSetPermissionsComponent,
  AppDialogCopyComponent,
  AppDialogMoveComponent,
  AppDialogUploadFilesComponent
];

@NgModule({
  entryComponents: [...dialogComponents],
  declarations: [
    ...dialogComponents,
    NgxFileManagerComponent,
    AppFileTableComponent,
    AppFileTableMiniFolderBrowserComponent,
    AppBreadCrumbsComponent,
    AppActionsMiniBrowserComponent,
    AppBulkActionsComponent,
    AppFolderActionsComponent,
    AppBtnsCancelOkComponent,
    FileDetailsComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutoTableModule,
    DropzoneModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [NgxFileManagerComponent],
  providers: [
    ServerFilesystemProviderService,
    // OptimisticFilesystemService,
    { provide: LoggerService, useClass: ConsoleLoggerService }
  ]
})
export class NgxFilemanagerClientFirebaseModule {}
