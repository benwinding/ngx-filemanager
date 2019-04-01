import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AutoTableModule } from 'ngx-auto-table/dist';
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
  MatSidenavModule
} from '@angular/material';
import { AppDialogRenameComponent } from './components/dialog-rename.component';
import { AppDialogNewFolderComponent } from './components/dialog-new-folder.component';
import { FileDetailsComponent } from './components/file-details.component';
import { FileSizePipe } from './services/file-size.pipe';
import { NgxFileManagerComponent } from './components/file-manager.component';
import { FilesSystemProviderService } from './services/files-provider.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NgxFileManagerComponent,
    AppDialogRenameComponent,
    AppDialogNewFolderComponent,
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
    MatSidenavModule
  ],
  exports: [NgxFileManagerComponent],
  providers: [FilesSystemProviderService]
})
export class NgxFilemanagerClientFirebaseModule {}
