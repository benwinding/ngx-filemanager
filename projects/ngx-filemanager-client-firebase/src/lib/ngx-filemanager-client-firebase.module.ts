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
import {
  BaseDialogComponent,
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogPermissionsSetComponent,
  AppDialogPermissionsSetObjectComponent,
  AppDialogCopyComponent,
  AppDialogUploadFilesComponent,
  AppDialogMyDetailsComponent,
  AppBtnsCancelOkComponent,
  AppControlTagMultipleComponent
} from './dialogs';
import { AppFileTableComponent } from './file-table';
import {
  AppFileTableMiniFolderBrowserComponent,
  AppActionsMiniBrowserComponent
} from './file-table-mini';
import { AppBreadCrumbsComponent } from './bread-crumbs';
import {
  AppBulkActionsComponent,
  AppFolderActionsComponent
} from './actions-toolbars';
import { FileDetailsComponent } from './file-details';
import { FileSizePipe, IconUrlResolverService } from './utils';
import { FormFileFirebaseModule } from './file-upload';
import {
  ServerFilesystemProviderService,
  FilemanagerStatusService
} from './filesystem';
import { NotificationService } from './notifications';
import { LoggerService, ConsoleLoggerService } from './logging';
import { NgxFileManagerComponent } from './file-manager';

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
