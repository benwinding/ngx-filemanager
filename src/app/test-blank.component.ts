import { Component } from '@angular/core';
import { ClientConfiguration } from 'ngx-filemanager-client-firebase/public_api';
import { FilesSystemProviderService } from 'ngx-filemanager-client-firebase/public_api';

@Component({
  selector: 'app-test-blank',
  template: `
    <h2>Test Blank</h2>
    <div>
      <ngx-filemanager [fileSystem]="firebaseClientProvider"> </ngx-filemanager>
    </div>
  `
})
export class AppTestBlankComponent {
  firebaseClientProvider: FilesSystemProviderService;

  config: ClientConfiguration = {
    functionsendpoint: 'string'
  };
}
