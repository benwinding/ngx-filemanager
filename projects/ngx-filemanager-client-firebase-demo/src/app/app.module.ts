import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFilemanagerClientFirebaseModule } from 'projects/ngx-filemanager-client-firebase/src/public_api';
import { AppTestFunctionsLocallyComponent } from './test-functions-locally.component';
import { AppTestStubFilesystemComponent } from './test-stub-filesystem.component';
import { AppTestFunctionsRemoteComponent } from './test-functions-remote.component';
import { AppPermissionsSelectionComponent } from './permissions-selection.component';
import { MatReduceModule } from 'mat-reduce';

@NgModule({
  declarations: [
    AppComponent,
    AppPermissionsSelectionComponent,
    AppTestFunctionsLocallyComponent,
    AppTestFunctionsRemoteComponent,
    AppTestStubFilesystemComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxFilemanagerClientFirebaseModule,
    FormsModule,
    MatReduceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
