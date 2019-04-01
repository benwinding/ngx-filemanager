import { Component } from '@angular/core';
import { ClientConfiguration } from 'ngx-filemanager-client-firebase/public_api';

@Component({
  selector: 'app-test-blank',
  template: `
    <h2>Test Blank</h2>
    <!--
    -->
    <div>
      <ngx-filemanager [clientConfig]="config"> </ngx-filemanager>
    </div>
  `
})
export class AppTestPageComponent {
  config: ClientConfiguration = {
    functionsendpoint: 'string'
  };
}
