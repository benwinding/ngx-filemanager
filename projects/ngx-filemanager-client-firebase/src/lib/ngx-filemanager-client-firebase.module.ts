import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, PlatformLocation } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { getBaseHref } from './getBaseHref';
import { LibMainFileManagerComponent } from './ui/main-file-manager/main-file-manager.component';
import { AppBreadCrumbsComponent } from './ui/bread-crumbs/bread-crumbs.component';
import { AppBulkActionsComponent } from './ui/actions-toolbars/bulk-actions.component';
import { AppMainActionsComponent } from './ui/actions-toolbars/main-actions.component';
import { FileDetailsComponent } from './ui/file-details/file-details.component';
import { FormFileFirebaseModule } from './ui/file-upload/file-upload.module';
import { FilemanagerStatusService } from './services/state/status.service';
import { NotificationService } from './services/pure/notification.service';
import { LoggerService } from './services/logging/logger.service';
import { ConsoleLoggerService } from './services/logging/console-logger.service';
import { ServerFilesystemProviderService } from './services/pure/server-filesystem.service';
import { IconUrlResolverService } from './services/pure/icon-url-resolver.service';
import { NgxFilemanagerClientDialogsModule } from './ui/dialogs/dialogs.module';
import { FileSizeModule } from './ui/file-size/file-size.module';
import { AppFileTableModule } from './ui/file-table/file-table.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const declarations = [
  LibMainFileManagerComponent,
  AppBreadCrumbsComponent,
  AppBulkActionsComponent,
  AppMainActionsComponent,
  FileDetailsComponent,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
  exports: [LibMainFileManagerComponent],
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
