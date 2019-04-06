import { Component } from '@angular/core';
import { FilesSystemProviderService } from 'ngx-filemanager-client-firebase';

@Component({
  selector: 'app-test-page',
  template: `
    <h2>File Explorer</h2>
    <!--
  -->
    <div>
      <ngx-filemanager [fileSystem]="firebaseClientProvider"> </ngx-filemanager>
    </div>
  `
})
export class AppTestPageComponent {
  constructor(public firebaseClientProvider: FilesSystemProviderService) {
    this.firebaseClientProvider.Initialize(
      'cl-building-storage',
      'http://localhost:8010/communitilink-r3/us-central1/ApiPublic/storage/api'
    );
  }
}
