import { NgModule } from '@angular/core';
import { AppFileTableMiniFolderBrowserComponent } from './file-table-mini-folder-browser.component';
import { AppActionsMiniBrowserComponent } from './actions-mini-browser.component';
import { CommonModule } from '@angular/common';
import { AutoTableModule } from 'ngx-auto-table';
import { FileSizeModule } from '../file-size/file-size.module';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AutoTableModule,
    FileSizeModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [AppFileTableMiniFolderBrowserComponent],
  declarations: [
    AppFileTableMiniFolderBrowserComponent,
    AppActionsMiniBrowserComponent
  ],
  providers: [],
})
export class FileTableMiniModule { }
