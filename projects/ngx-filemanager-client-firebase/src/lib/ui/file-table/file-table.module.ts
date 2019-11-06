import { NgModule } from '@angular/core';

import { CardFileComponent } from './card-file.component';
import { CardFolderComponent } from './card-folder.component';
import { AppFileTableComponent } from './file-table.component';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule
} from '@angular/material';
import { FileSizeModule } from '../file-size/file-size.module';

@NgModule({
  imports: [
    CommonModule,
    FileSizeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [AppFileTableComponent],
  declarations: [CardFileComponent, CardFolderComponent, AppFileTableComponent],
  providers: []
})
export class AppFileTableModule {}
