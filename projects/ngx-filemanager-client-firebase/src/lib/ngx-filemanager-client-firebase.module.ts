import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
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
  MatTabsModule
} from '@angular/material';
import { AppDialogRenameComponent } from './components/dialog-rename.component';
import { AppDialogNewFolderComponent } from './components/dialog-new-folder.component';
import { FileDetailsComponent } from './components/file-details.component';
import { FileSizePipe } from './services/file-size.pipe';
import { NgxFileManagerComponent } from './components/file-manager.component';
import { FilesSystemProviderService } from './services/files-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { FilesClientCacheService } from './services/files-client-cache.service';
import { AppDialogSetPermissionsComponent } from './components/dialog-setpermissions.component';

const dialogComponents = [
  AppDialogRenameComponent,
  AppDialogNewFolderComponent,
  AppDialogSetPermissionsComponent
];

@NgModule({
  entryComponents: [
    ...dialogComponents
  ],
  declarations: [
    ...dialogComponents,
    NgxFileManagerComponent,
    FileDetailsComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AutoTableModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
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
    MatTooltipModule,
  ],
  exports: [NgxFileManagerComponent],
  providers: [FilesSystemProviderService, FilesClientCacheService]
})
export class NgxFilemanagerClientFirebaseModule {}
