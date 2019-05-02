import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <a [routerLink]="['/']"> Test App for NgxFilemanager </a>
    </div>

    <ol>
      <li>
        <a [routerLink]="['/test-stub-filesystem']"> Test filesystem </a>
      </li>
      <li>
        <a [routerLink]="['/test-functions-remote']"> Connect to remote filesystem </a>
      </li>
      <li>
        <a [routerLink]="['/test-functions-locally']"> Connect to local instance </a>
      </li>
    </ol>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
