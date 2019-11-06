import { NgModule } from '@angular/core';
import { AppFileTableMiniFolderBrowserComponent } from './file-table-mini-folder-browser.component';
import { AppActionsMiniBrowserComponent } from './actions-mini-browser.component';
import { CommonModule } from '@angular/common';
import { FileSizeModule } from '../file-size/file-size.module';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';
import { AppFileTableModule } from '../file-table/file-table.module';

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
