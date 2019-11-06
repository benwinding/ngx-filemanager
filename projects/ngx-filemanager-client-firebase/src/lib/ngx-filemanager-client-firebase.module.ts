import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, PlatformLocation } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatCardModule,
  MatSnackBarModule,
  MatChipsModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { getBaseHref } from './getBaseHref';
import { BaseDialogComponent } from './dialogs/base-dialog.component';
import { AppBtnsCancelOkComponent } from './dialogs/btns-cancel-ok.component';
import { AppControlTagMultipleComponent } from './dialogs/tags-control.component';
import { NgxFileManagerComponent } from './file-manager/file-manager.component';
import { AppFileTableMiniFolderBrowserComponent } from './file-table-mini/file-table-mini-folder-browser.component';
import { AppBreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { AppActionsMiniBrowserComponent } from './file-table-mini/actions-mini-browser.component';
import { AppBulkActionsComponent } from './actions-toolbars/bulk-actions.component';
import { AppFolderActionsComponent } from './actions-toolbars/folder-actions.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { FormFileFirebaseModule } from './file-upload/file-upload.module';
import { FilemanagerStatusService } from './filesystem/state/status.service';
import { NotificationService } from './notifications/notification.service';
import { LoggerService } from './logging/logger.service';
import { ConsoleLoggerService } from './logging/console-logger.service';
import { ServerFilesystemProviderService } from './filesystem/pure/server-filesystem.service';
import { FileSizePipe } from './utils/file-size.pipe';
import { IconUrlResolverService } from './utils/icon-url-resolver.service';
import {
  AppFileTableComponent,
  CardFileComponent,
  CardFolderComponent
} from './file-table';
import {
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogPermissionsSetComponent,
  AppDialogPermissionsSetObjectComponent,
  AppDialogCopyComponent,
  AppDialogUploadFilesComponent,
  AppDialogMyDetailsComponent
} from './dialogs';

const entryComponents = [
  BaseDialogComponent,
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogPermissionsSetComponent,
  AppDialogPermissionsSetObjectComponent,
  AppDialogCopyComponent,
  AppDialogUploadFilesComponent,
  AppDialogMyDetailsComponent
];

const declarations = [
  ...entryComponents,
  NgxFileManagerComponent,
  AppFileTableComponent,
  CardFileComponent,
  CardFolderComponent,
  AppFileTableMiniFolderBrowserComponent,
  AppBreadCrumbsComponent,
  AppActionsMiniBrowserComponent,
  AppBulkActionsComponent,
  AppFolderActionsComponent,
  AppBtnsCancelOkComponent,
  AppControlTagMultipleComponent,
  FileDetailsComponent,
  FileSizePipe
];

@NgModule({
  entryComponents: entryComponents,
  declarations: declarations,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoTableModule,
    DropzoneModule,

    FormFileFirebaseModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
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
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [NgxFileManagerComponent],
  providers: [
    ServerFilesystemProviderService,
    FilemanagerStatusService,
    NotificationService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    IconUrlResolverService
  ]
})
export class NgxFilemanagerClientFirebaseModule {}
