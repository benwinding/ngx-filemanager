import { FormFileFirebaseComponent } from './form-file-firebase/form-file-firebase.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFileUploadedFileListComponent } from './form-file-firebase/form-file-uploader-list.component';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
