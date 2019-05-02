import { Component, OnDestroy } from '@angular/core';
import {
  FileManagerConfig,
  ServerFilesystemProviderService
} from 'ngx-filemanager-client';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { $users, $groups } from './users-factory';

@Component({
  selector: 'app-test-page',
  template: `
    <mat-card>
      <mat-form-field style="margin-right: 15px;">
        <input
          matInput
          placeholder="bucketName"
          type="text"
          [formControl]="bucketName"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          placeholder="apiEndpoint"
          type="text"
          [formControl]="apiEndpoint"
        />
      </mat-form-field>
    </mat-card>

    <h2>File Explorer</h2>
    <div *ngIf="showExplorer">
      <ngx-filemanager [fileSystem]="firebaseClientProvider" [config]="config">
      </ngx-filemanager>
    </div>
  `
})
export class AppTestFunctionsRemoteComponent implements OnDestroy {
  public config: FileManagerConfig = {
    virtualRoot: '/',
    users: $users,
    groups: $groups
  };

  bucketName = new FormControl('my-test-bucketname');
  apiEndpoint = new FormControl('http://localhost:4444/ApiPublic/files');
  showExplorer = true;

  destroyed = new Subject();

  constructor(public firebaseClientProvider: ServerFilesystemProviderService) {
    this.bucketName.setValue(localStorage.getItem('bucketname'));
    this.apiEndpoint.setValue(localStorage.getItem('apiendpoint'));
    this.reInitializeExplorer();
    this.bucketName.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroyed)
      )
      .subscribe(() => this.reInitializeExplorer());
    this.apiEndpoint.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroyed)
      )
      .subscribe(() => this.reInitializeExplorer());
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  async reInitializeExplorer() {
    this.showExplorer = false;
    this.firebaseClientProvider.Initialize(
      this.bucketName.value,
      this.apiEndpoint.value
    );
    localStorage.setItem('bucketname', this.bucketName.value);
    localStorage.setItem('apiendpoint', this.apiEndpoint.value);
    setTimeout(() => {
      this.showExplorer = true;
    }, 100);
  }
}
