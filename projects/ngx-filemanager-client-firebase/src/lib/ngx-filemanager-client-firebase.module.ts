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
import { NgxFileManagerComponent } from './ui/file-manager/file-manager.component';
import { AppBreadCrumbsComponent } from './ui/bread-crumbs/bread-crumbs.component';
import { AppBulkActionsComponent } from './ui/actions-toolbars/bulk-actions.component';
import { AppFolderActionsComponent } from './ui/actions-toolbars/folder-actions.component';
import { FileDetailsComponent } from './ui/file-details/file-details.component';
import { FormFileFirebaseModule } from './ui/file-upload/file-upload.module';
import { FilemanagerStatusService } from './state/state/status.service';
import { NotificationService } from './state/pure/notification.service';
import { LoggerService } from './state/logging/logger.service';
import { ConsoleLoggerService } from './state/logging/console-logger.service';
import { ServerFilesystemProviderService } from './state/pure/server-filesystem.service';
import { IconUrlResolverService } from './state/pure/icon-url-resolver.service';
import { NgxFilemanagerClientDialogsModule } from './ui/dialogs/dialogs.module';
import { FileSizeModule } from './ui/file-size/file-size.module';
import { AppFileTableModule } from './ui/file-table/file-table.module';

const declarations = [
  NgxFileManagerComponent,
  AppBreadCrumbsComponent,
  AppBulkActionsComponent,
  AppFolderActionsComponent,
  FileDetailsComponent,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoTableModule,
    DropzoneModule,
    FileSizeModule,

    AppFileTableModule,
    FormFileFirebaseModule,
    NgxFilemanagerClientDialogsModule,

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
