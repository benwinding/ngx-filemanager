import { NgModule } from '@angular/core';
import { AppFileTableMiniFolderBrowserComponent } from './file-table-mini-folder-browser.component';
import { AppActionsMiniBrowserComponent } from './actions-mini-browser.component';
import { CommonModule } from '@angular/common';
import { FileSizeModule } from '../file-size/file-size.module';

import { AppFileTableModule } from '../file-table/file-table.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FileSizeModule,
    MatButtonModule,
    MatIconModule,
    AppFileTableModule,
    MatToolbarModule
  ],
  exports: [AppFileTableMiniFolderBrowserComponent],
  declarations: [
    AppFileTableMiniFolderBrowserComponent,
    AppActionsMiniBrowserComponent
  ],
  providers: []
})
export class FileTableMiniModule {}
