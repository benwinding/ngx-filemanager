import { Component } from '@angular/core';
import { ClientConfiguration } from 'ngx-filemanager-client-firebase/public_api';

@Component({
  selector: 'app-test-page',
  template: `
    <h2>File Explorer</h2>
    <!--
  -->
    <div>
      <ngx-filemanager [clientConfig]="config"> </ngx-filemanager>
    </div>
  `
})
export class AppTestPageComponent {
  config: ClientConfiguration = {
    functionsendpoint: 'https://'
  };
}
