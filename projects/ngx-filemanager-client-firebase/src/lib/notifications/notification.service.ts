import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
  constructor(private matSnackbar: MatSnackBar) {}

  public notify(msg: string, title?: string, isError?: boolean) {
    return this.matSnackbar.open(msg, title, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  public notifyCancelled() {
    return this.notify('Cancelled Operation');
  }
}
