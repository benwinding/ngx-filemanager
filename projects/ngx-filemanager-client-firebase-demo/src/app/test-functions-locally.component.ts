import { Component } from '@angular/core';
import {
  FileManagerConfig,
  ServerFilesystemProviderService,
} from 'ngx-filemanager-client-firebase';
import { $users, $groups } from './users-factory';


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
export class AppTestFunctionsLocallyComponent {
  public config: FileManagerConfig = {
    virtualRoot: '/clientTesting/',
    users: $users,
    groups: $groups
  };
  constructor(public firebaseClientProvider: ServerFilesystemProviderService) {
    const bucketName = 'resvu-integration-tests.appspot.com';
    const apiEndpoint = 'http://localhost:4444/ApiPublic/files';
    // const bucketName = 'cl-building-storage';
    // const apiEndpoint =
    //   'http://localhost:8010/communitilink-r3/us-central1/ApiPublic/files';
    this.firebaseClientProvider.Initialize(bucketName, apiEndpoint);
  }
}
