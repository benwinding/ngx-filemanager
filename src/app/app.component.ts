import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <a [routerLink]="['/']"> Test App for NgxFilemanager </a>
    </div>

    <ol>
      <li>
        <a [routerLink]="['/test-blank']"> Test Blank </a>
      </li>
      <li>
        <a [routerLink]="['/test-page']"> Test 1 </a>
      </li>
    </ol>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
