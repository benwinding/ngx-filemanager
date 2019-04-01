import { Component, OnInit } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/dist';
import { of } from 'rxjs';
import { ClientConfiguration } from 'ngx-filemanager-client-firebase/public_api';
import { ReqBodyCopy } from 'ngx-filemanager-core/public_api';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      Test App for NgxFilemanager
    </div>

    <h2>File Explorer</h2>
    <!--
    -->
    <div>
      <ngx-filemanager
        [clientConfig]="config"
      >
      </ngx-filemanager>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  config: ClientConfiguration = {
    functionsendpoint: 'https://'
  };

  ngOnInit() { }
}
