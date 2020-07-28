import { NgModule } from '@angular/core';

import { CardFileComponent } from './card-file.component';
import { CardFolderComponent } from './card-folder.component';
import { AppFileTableComponent } from './file-table.component';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

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
  exports: [AppFileTableComponent, CardFolderComponent],
  declarations: [CardFileComponent, CardFolderComponent, AppFileTableComponent],
  providers: []
})
export class AppFileTableModule {}
