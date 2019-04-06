import { Component } from '@angular/core';
import { FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { FileSystemStub } from './file-system-stub';
import { FileManagerConfig } from 'ngx-filemanager-client-firebase';

@Component({
  selector: 'app-test-blank',
  template: `
    <h2>Test Blank</h2>
    <div>
      <ngx-filemanager [config]="config" [fileSystem]="blankFileSystem">
      </ngx-filemanager>
    </div>
  `
})
export class AppTestBlankComponent {
  public blankFileSystem: FileSystemProvider = new FileSystemStub();
  public config: FileManagerConfig = {
    initialPath: '/'
  };
}
