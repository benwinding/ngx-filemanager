import { FileDetailsComponent } from './components/file-details.component';
import { NgxFileManagerComponent } from './components/file-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {
  MatTableModule,
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
  MatToolbarModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import { AutoTableModule } from 'ngx-auto-table/dist';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileSizePipe } from './services/file-size.pipe';
import { AppDialogNewFolderComponent } from './components/dialog-new-folder.component';
import { AppDialogRenameComponent } from './components/dialog-rename.component';

const sharedComponents = [NgxFileManagerComponent];

@NgModule({
  declarations: [
    ...sharedComponents,
    FileDetailsComponent,
    FileSizePipe,
    AppDialogRenameComponent,
    AppDialogNewFolderComponent,
  ],
  exports: sharedComponents,
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
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
  ]
})
export class NgxFilemanagerClientModule {}
