import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFilemanagerClientFirebaseModule } from 'ngx-filemanager-client-firebase';
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
    NgxFilemanagerClientFirebaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
