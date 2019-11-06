import { NgModule } from '@angular/core';
import { AppControlTagMultipleComponent } from './tags-control.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [AppControlTagMultipleComponent],
  declarations: [AppControlTagMultipleComponent],
  providers: []
})
export class TagsControlModule {}
