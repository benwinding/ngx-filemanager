import { Component, OnDestroy } from '@angular/core';
import {
  FileManagerConfig,
  ServerFilesystemProviderService
} from 'projects/ngx-filemanager-client-firebase/src/public_api';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  takeUntil,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
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
      <mat-form-field>
        <textarea
          matInput
          placeholder="firebaseConfig"
          type="text"
          [formControl]="firebaseConfig"
        >
        </textarea>
      </mat-form-field>
      <div style="display: flex;">
      <div style="margin-right: 10px">
        <p>Is Admin? ({{ isAdminControl.value ? 'Yes' : 'No' }})</p>
        <mat-slide-toggle [formControl]="isAdminControl"> </mat-slide-toggle>
      </div>
      <div>
        <p>Enable Search? ({{ hasSearchControl.value ? 'Yes' : 'No' }})</p>
        <mat-slide-toggle [formControl]="hasSearchControl"> </mat-slide-toggle>
      </div>
      <mat-form-field style="margin-left: 15px;">
        <input
          matInput
          placeholder="folderSizePath"
          type="text"
          [formControl]="folderSizePath"
        />
      </mat-form-field>
      </div>
    </mat-card>

    <h2>File Explorer</h2>
    <div *ngIf="showExplorer">
      <ngx-filemanager
        [fileSystem]="serverFilesystemProvider"
        [config]="config"
      >
      </ngx-filemanager>
    </div>
  `
})
export class AppTestFunctionsRemoteComponent implements OnDestroy {
  public config: FileManagerConfig = {
    virtualRoot: '/',
    users: $users,
    groups: $groups,
    firebaseConfig: environment.firebaseConfig,
    bucketName: '',
    folderSizePath: ''
  };

  bucketName = new FormControl();
  apiEndpoint = new FormControl();
  virtualRoot = new FormControl();
  firebaseConfig = new FormControl();
  isAdminControl = new FormControl();
  hasSearchControl = new FormControl();
  folderSizePath = new FormControl();

  showExplorer = false;

  destroyed = new Subject();

  constructor(
    public serverFilesystemProvider: ServerFilesystemProviderService
  ) {
    function getNotNullValue$(control: FormControl) {
      return control.valueChanges.pipe(filter(v => !!v));
    }

    combineLatest([
      getNotNullValue$(this.bucketName),
      getNotNullValue$(this.apiEndpoint),
      getNotNullValue$(this.virtualRoot),
      getNotNullValue$(this.firebaseConfig).pipe(
        map(v => {
          try {
            const json = JSON.stringify(JSON.parse(v));
            return json;
          } catch (error) {
            return '';
          }
        }),
        distinctUntilChanged()
      ),
      this.isAdminControl.valueChanges,
      this.hasSearchControl.valueChanges,
      this.folderSizePath.valueChanges
    ])
      .pipe(debounceTime(500), takeUntil(this.destroyed))
      .subscribe(() => this.reInitializeExplorer());
    this.setDefaults();
  }

  setDefaults() {
    this.bucketName.setValue(
      localStorage.getItem('bucketname') || 'my-test-bucketname'
    );
    this.apiEndpoint.setValue(
      localStorage.getItem('apiendpoint') ||
        'http://localhost:4444/ApiPublic/files'
    );
    this.virtualRoot.setValue(localStorage.getItem('virtualRoot') || '/');
    this.firebaseConfig.setValue(localStorage.getItem('firebaseConfig') || '');
    this.isAdminControl.setValue(localStorage.getItem('isAdmin') == 'true' || false);
    this.hasSearchControl.setValue(localStorage.getItem('hasSearch') == 'true' || false);
    this.folderSizePath.setValue(localStorage.getItem('folderSizePath') || '');
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
      isAdmin: true
    });
    this.config.virtualRoot = this.virtualRoot.value;
    this.config.bucketName = this.bucketName.value;
    this.config.isAdmin = this.isAdminControl.value;
    this.config.enableSearch = this.hasSearchControl.value;
    this.config.folderSizePath = this.folderSizePath.value;
    localStorage.setItem('bucketname', this.bucketName.value);
    localStorage.setItem('apiendpoint', this.apiEndpoint.value);
    localStorage.setItem('virtualRoot', this.virtualRoot.value);
    localStorage.setItem('firebaseConfig', this.firebaseConfig.value);
    localStorage.setItem('isAdmin', this.isAdminControl.value);
    localStorage.setItem('hasSearch', this.hasSearchControl.value);
    localStorage.setItem('folderSizePath', this.folderSizePath.value);
    setTimeout(() => {
      this.showExplorer = true;
    }, 100);
  }
}
