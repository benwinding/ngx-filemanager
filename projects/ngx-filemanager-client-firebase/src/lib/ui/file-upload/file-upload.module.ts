import { FormFileFirebaseComponent } from './form-file-firebase/form-file-firebase.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';
import { FormFileUploadedFileListComponent } from './form-file-firebase/form-file-uploader-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [FormFileFirebaseComponent],
  declarations: [FormFileFirebaseComponent, FormFileUploadedFileListComponent],
  providers: []
})
export class FormFileFirebaseModule {}
