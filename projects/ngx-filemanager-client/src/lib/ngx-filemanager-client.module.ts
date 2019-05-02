import { NgModule } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';
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

import { FileDetailsComponent } from './file-details/file-details.component';
import { FileSizePipe } from './utils/file-size.pipe';
import { ServerFilesystemProviderService } from './filesystem/server-filesystem.service';

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
import { AppDialogPermissionsSetComponent } from './dialogs/dialog-permissions-set.component';
import { AppDialogCopyComponent } from './dialogs/dialog-copy-or-move.component';
import { LoggerService } from './logging/logger.service';
import { ConsoleLoggerService } from './logging/console-logger.service';
import { AppFileTableMiniFolderBrowserComponent } from './file-table-mini/file-table-mini-folder-browser.component';
import { AppActionsMiniBrowserComponent } from './file-table-mini/actions-mini-browser.component';
import { NotificationService } from './notifications/notification.service';

import { APP_BASE_HREF } from '@angular/common';
import { IconUrlResolverService } from './utils/icon-url-resolver.service';
import { AppDialogMyDetailsComponent } from './dialogs/dialog-my-details.components';
import { AppDialogPermissionsSetObjectComponent } from './dialogs/dialog-permissions-setobject.component';
import { AppControlTagMultipleComponent } from './dialogs/tags-control.component';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

const dialogComponents = [
  BaseDialogComponent,
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogPermissionsSetComponent,
  AppDialogPermissionsSetObjectComponent,
  AppDialogCopyComponent,
  AppDialogUploadFilesComponent,
  AppDialogMyDetailsComponent
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
    AppControlTagMultipleComponent,
    FileDetailsComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoTableModule,
    DropzoneModule,

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
