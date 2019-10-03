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
  delay
} from 'rxjs/operators';
import { Subject, combineLatest, pipe } from 'rxjs';
import { $users, $groups } from './users-factory';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-test-page',
  template: `
    <mat-card>
      <form-text
        [formControl]="bucketName"
        placeholder="bucketName"
      ></form-text>
      <form-text
        [formControl]="apiEndpoint"
        placeholder="apiEndpoint"
      ></form-text>
      <form-text
        [formControl]="virtualRoot"
        placeholder="virtualRoot"
      ></form-text>
      <form-textarea
        [formControl]="firebaseConfig"
        placeholder="firebaseConfig"
      ></form-textarea>
      <form-text
        [allowAutoComplete]="true"
        [formControl]="email"
        placeholder="email"
      ></form-text>
      <form-text-password
        [allowAutoComplete]="true"
        [formControl]="pass"
        placeholder="password"
      ></form-text-password>
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
    bucketName: ''
  };

  bucketName = new FormControl('my-test-bucketname');
  apiEndpoint = new FormControl('http://localhost:4444/ApiPublic/files');
  virtualRoot = new FormControl('/');
  firebaseConfig = new FormControl('');
  email = new FormControl('');
  pass = new FormControl('');

  showExplorer = true;

  destroyed = new Subject();

  constructor(
    public serverFilesystemProvider: ServerFilesystemProviderService,
    public snackbar: MatSnackBar
  ) {
    combineLatest([
      this.bucketName.valueChanges,
      this.apiEndpoint.valueChanges,
      this.virtualRoot.valueChanges,
      this.firebaseConfig.valueChanges.pipe(
        map(v => {
          try {
            const json = JSON.stringify(JSON.parse(v));
            return json;
          } catch (error) {
            return '';
          }
        }),
        distinctUntilChanged()
      )
    ])
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroyed)
      )
      .subscribe(() => this.reInitializeExplorer());
    this.bucketName.setValue(localStorage.getItem('bucketname'));
    this.apiEndpoint.setValue(localStorage.getItem('apiendpoint'));
    this.virtualRoot.setValue(localStorage.getItem('virtualRoot') || '/');
    this.firebaseConfig.setValue(localStorage.getItem('firebaseConfig') || '');
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  async reInitializeExplorer() {
    this.showExplorer = false;
    const bucketName = this.bucketName.value;
    await this.initFirebase();
    const bucket = firebase.app().storage('gs://' + bucketName);
    this.serverFilesystemProvider.Initialize({
      bucketname: bucketName,
      apiEndpoint: this.apiEndpoint.value,
      storageBucket: bucket
    });
    this.config.virtualRoot = this.virtualRoot.value;
    this.config.bucketName = this.bucketName.value;
    localStorage.setItem('bucketname', this.bucketName.value);
    localStorage.setItem('apiendpoint', this.apiEndpoint.value);
    localStorage.setItem('virtualRoot', this.virtualRoot.value);
    localStorage.setItem('firebaseConfig', this.firebaseConfig.value);
    setTimeout(() => {
      this.showExplorer = true;
    }, 100);
  }

  async initFirebase() {
    try {
      if (firebase.apps.length) {
        await firebase.app().delete();
      }
      await this.delay(200);
      const firebaseConfig = JSON.parse(this.firebaseConfig.value);
      firebase.initializeApp(firebaseConfig);
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email.value, this.pass.value);
      await this.delay(200);
      if (!res) {
        throw new Error('Signin didnt work!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  delay(ms: number) {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, ms);
    });
  }
}
