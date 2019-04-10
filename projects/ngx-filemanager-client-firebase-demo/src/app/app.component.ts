import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <a [routerLink]="['/']"> Test App for NgxFilemanager </a>
    </div>

    <ol>
      <li>
        <a [routerLink]="['/test-functions-locally']"> Test functions locally </a>
      </li>
      <li>
        <a [routerLink]="['/test-functions-remote']"> Test functions remote </a>
      </li>
      <li>
        <a [routerLink]="['/test-stub-filesystem']"> Test stub filesystem </a>
      </li>
    </ol>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
