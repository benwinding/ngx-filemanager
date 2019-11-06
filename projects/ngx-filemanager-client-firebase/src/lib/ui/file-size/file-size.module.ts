import { NgModule } from '@angular/core';
import { FileSizePipe } from './file-size.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [CommonModule],
  exports: [FileSizePipe],
  declarations: [FileSizePipe],
  providers: [],
})
export class FileSizeModule { }
