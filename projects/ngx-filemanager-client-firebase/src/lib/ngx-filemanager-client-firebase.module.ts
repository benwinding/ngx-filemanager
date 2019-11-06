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
import { NgxFileManagerComponent } from './file-manager/file-manager.component';
import { AppBreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { AppBulkActionsComponent } from './actions-toolbars/bulk-actions.component';
import { AppFolderActionsComponent } from './actions-toolbars/folder-actions.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { FormFileFirebaseModule } from './file-upload/file-upload.module';
import { FilemanagerStatusService } from './filesystem/state/status.service';
import { NotificationService } from './notifications/notification.service';
import { LoggerService } from './logging/logger.service';
import { ConsoleLoggerService } from './logging/console-logger.service';
import { ServerFilesystemProviderService } from './filesystem/pure/server-filesystem.service';
import { IconUrlResolverService } from './utils/icon-url-resolver.service';
import { CardFileComponent } from './file-table/card-file.component';
import { CardFolderComponent } from './file-table/card-folder.component';
import { AppFileTableComponent } from './file-table/file-table.component';
import { NgxFilemanagerClientDialogsModule } from './dialogs/dialogs.module';
import { FileSizeModule } from './file-size/file-size.module';

const declarations = [
  NgxFileManagerComponent,
  CardFileComponent,
  CardFolderComponent,
  AppFileTableComponent,
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
