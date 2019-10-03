import { Component } from '@angular/core';
import {
  FileManagerConfig,
  ServerFilesystemProviderService
} from 'projects/ngx-filemanager-client-firebase/src/public_api';
import { $users, $groups } from './users-factory';
import { environment } from '../environments/environment';

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
    groups: $groups,
    firebaseConfig: environment.firebaseConfig,
    bucketName: environment.firebaseConfig.storageBucket
  };
  constructor(public firebaseClientProvider: ServerFilesystemProviderService) {
    const bucketName = 'resvu-integration-tests.appspot.com';
    const apiEndpoint = 'http://localhost:4444/ApiPublic/files';
    // const bucketName = 'cl-building-storage';
    // const apiEndpoint =
    //   'http://localhost:8010/communitilink-r3/us-central1/ApiPublic/files';
    this.firebaseClientProvider.Initialize({
      bucketname: bucketName,
      apiEndpoint: apiEndpoint,
      storageBucket: null,
    });
  }
}
