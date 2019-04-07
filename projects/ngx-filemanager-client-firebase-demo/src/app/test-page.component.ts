import { Component } from '@angular/core';
import { FilesSystemProviderService, FileManagerConfig } from 'ngx-filemanager-client-firebase';

@Component({
  selector: 'app-test-page',
  template: `
    <h2>File Explorer</h2>
    <!--
  -->
    <div>
      <ngx-filemanager [fileSystem]="firebaseClientProvider" [config]="config"> </ngx-filemanager>
    </div>
  `
})
export class AppTestPageComponent {
  public config: FileManagerConfig = {
    initialPath: '/'
  };
  constructor(public firebaseClientProvider: FilesSystemProviderService) {
    this.firebaseClientProvider.Initialize(
      'resvu-integration-tests.appspot.com',
      'http://localhost:4444/api_files'
    );
  }
}
