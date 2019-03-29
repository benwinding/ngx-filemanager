import { Component, OnInit } from '@angular/core';
import { AutoTableConfig } from 'ngx-auto-table/dist/public_api';
import { of } from 'rxjs';
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
      <ngx-auto-table
        [config]="config"
        [columnDefinitions]="{
          name: {}
        }"
      >
      </ngx-auto-table>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  config: AutoTableConfig<any>;

  ngOnInit() {
    this.config = {
      debug: true,
      data$: of([
        { name: '14' },
        { name: '27' },
        { name: '25' },
        { name: '22' },
        { name: '24' }
      ])
    };
  }
}
