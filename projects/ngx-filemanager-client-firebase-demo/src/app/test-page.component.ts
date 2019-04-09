import { Component } from '@angular/core';
import {
  FilesSystemProviderService,
  FileManagerConfig
} from 'ngx-filemanager-client-firebase';

@Component({
  selector: 'app-test-page',
  template: `
    <h2>File Explorer</h2>
    <div>
      <ngx-filemanager [fileSystem]="firebaseClientProvider" [config]="config">
      </ngx-filemanager>
    </div>
  `
})
export class AppTestPageComponent {
  public config: FileManagerConfig = {
    initialPath: '/'
  };
  constructor(
    public firebaseClientProvider: FilesSystemProviderService
  ) {
    const bucketName = 'cl-building-storage';
    // const apiEndpoint = 'http://localhost:4444/ApiPublic/files';
    const apiEndpoint = 'http://localhost:8010/communitilink-r3/us-central1/ApiPublic/files';
    this.firebaseClientProvider.Initialize(bucketName, apiEndpoint);
  }
}
