import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'btns-cancel-ok',
  template: `
    <div class="full-width text-center">
      <button mat-raised-button (click)="clickedCancel.emit()">
        <mat-icon>clear</mat-icon>
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        (click)="clickedOk.emit()"
        [disabled]="okDisabled"
      >
        <mat-icon>{{ okIcon }}</mat-icon>
        {{ okLabel }}
      </button>
    </div>
  `,
  styles: [
    `
      button {
        margin: 5px;
      }
    `
  ]
})
export class AppBtnsCancelOkComponent {
  @Input()
  okDisabled: boolean;
  @Input()
  okIcon: string;
  @Input()
  okLabel: string;
  @Output()
  clickedOk = new EventEmitter<void>();
  @Output()
  clickedCancel = new EventEmitter<void>();
}
