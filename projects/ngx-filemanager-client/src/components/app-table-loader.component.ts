import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-loader',
  template: `
    <mat-toolbar-row>
      <div class="loader-container is-button-icon">
        <div class="loader-div">
          <mat-spinner [diameter]="40"></mat-spinner>
        </div>
      </div>
    </mat-toolbar-row>
  `,
  styles: [
    `
      .loader-container {
        width: 100% !important;
        display: flex !important;
        padding: 0px 0px;
        z-index: 100000000;
      }
      .loader-div {
        margin: auto;
      }
      .loader-container,
      .is-button-icon {
        display: inline-block;
        margin: 0;
        margin-bottom: -4px;
        margin-right: 5px;
      }
    `
  ]
})
export class AppTableLoaderComponent {}
