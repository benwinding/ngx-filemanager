import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoTableModule } from 'ngx-auto-table';
import { CommonModule } from '@angular/common';
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
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFilemanagerClientFirebaseModule } from 'ngx-filemanager-client-firebase';
import { HttpClientModule } from '@angular/common/http';
import { AppTestFunctionsLocallyComponent } from './test-functions-locally.component';
import { AppTestStubFilesystemComponent } from './test-stub-filesystem.component';
import { AppTestFunctionsRemoteComponent } from './test-functions-remote.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTestFunctionsLocallyComponent,
    AppTestFunctionsRemoteComponent,
    AppTestStubFilesystemComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFilemanagerClientFirebaseModule,
    MatTableModule,
    AutoTableModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
