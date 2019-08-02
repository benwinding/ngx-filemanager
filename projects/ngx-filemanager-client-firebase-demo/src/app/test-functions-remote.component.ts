import { Component, OnDestroy } from '@angular/core';
import {
  FileManagerConfig,
  ServerFilesystemProviderService
} from 'ngx-filemanager-client-firebase';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { $users, $groups } from './users-factory';
import { environment } from '../environments/environment';

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
      <mat-form-field style="margin-right: 15px;">
        <input
          matInput
          placeholder="apiEndpoint"
          type="text"
          [formControl]="apiEndpoint"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          placeholder="virtualRoot"
          type="text"
          [formControl]="virtualRoot"
        />
      </mat-form-field>
    </mat-card>

    <h2>File Explorer</h2>
    <div *ngIf="showExplorer">
      <ngx-filemanager [fileSystem]="serverFilesystemProvider" [config]="config">
      </ngx-filemanager>
    </div>
  `
})
export class AppTestFunctionsRemoteComponent implements OnDestroy {
  public config: FileManagerConfig = {
    virtualRoot: '/',
    users: $users,
    groups: $groups,
    firebaseConfig: environment.firebaseConfig
  };

  bucketName = new FormControl('my-test-bucketname');
  apiEndpoint = new FormControl('http://localhost:4444/ApiPublic/files');
  virtualRoot = new FormControl('/');
  showExplorer = true;

  destroyed = new Subject();

  constructor(public serverFilesystemProvider: ServerFilesystemProviderService) {
    combineLatest([
      this.bucketName.valueChanges,
      this.apiEndpoint.valueChanges,
      this.virtualRoot.valueChanges
    ])
      .pipe(
        debounceTime(500),
        takeUntil(this.destroyed)
      )
      .subscribe(() => this.reInitializeExplorer());
    this.bucketName.setValue(localStorage.getItem('bucketname'));
    this.apiEndpoint.setValue(localStorage.getItem('apiendpoint'));
    this.virtualRoot.setValue(localStorage.getItem('virtualRoot') || '/');
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  async reInitializeExplorer() {
    this.showExplorer = false;
    const bucketName = this.bucketName.value;
    this.serverFilesystemProvider.Initialize({
      bucketname: bucketName,
      apiEndpoint: this.apiEndpoint.value,
      storage: null
    });
    this.config.virtualRoot = this.virtualRoot.value;
    localStorage.setItem('bucketname', this.bucketName.value);
    localStorage.setItem('apiendpoint', this.apiEndpoint.value);
    localStorage.setItem('virtualRoot', this.virtualRoot.value);
    setTimeout(() => {
      this.showExplorer = true;
    }, 100);
  }
}
