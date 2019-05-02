# NgxFilemanager

A filemanager for Angular (ngx).

## Features

- Using Angular Material Design
- Optimistic actions, (actions shown on client then confirmed on server)
- File type icons
- Actions

  - Files / Folders
    - Download
    - Rename
    - Delete
    - Copy
    - Move
    - Set permissions
  - Bulk Actions
    - Delete
    - Rename
    - Move
    - Copy
    - Set permissions

- Side Panel Previewer
  - Image Preview
  - Name
  - File size
  - Last modified
  - Permissions

## Supported Backends

- [x] Google Cloud Storage (firebase storage)
- [ ] FTP

## Firebase - Get Started

This package has been designed to be easy to install on an Angular app.

1. In your `functions` file for Firebase, navigate to the folder and install the 'filemanager' backend npm package.

`yarn add ngx-filemanager-api`

2. Then add the dependency to the cloud functions as an endpoint like so:

``` typescript
import { FileManagerEndpointExpress } from '../../ngx-filemanager-api/src/public_api';
exports.files_endpoint = functions.https.onRequest(FileManagerEndpointExpress(admin.storage()))
```

Now add the client-side npm package to the Angular App.

`yarn add ngx-filemanager-client`

Then import the module into your `app.module.ts`.

``` typescript
import { NgxFilemanagerClientFirebaseModule } from 'ngx-filemanager-client';

imports: [
  ...,
  NgxFilemanagerClientFirebaseModule
]
```

Then add the icon assets to the `angular.json` file:

``` json
"ngx-filemanager-client-demo": {
  ...,
  "architect": {
    "build": {
      ...,
      "options": {
        ...,
        "assets": [
          ...,
          {
            "glob": "**/*",
            "input": "node_modules/ngx-filemanager-client/assets",
            "output": "./assets/fileicons"
          }
```

Finally add the filemanager component where you want, with the correct configuration details to read your cloud function and the bucket name you want.

``` javascript
import { Component } from '@angular/core';
import {
  FilesSystemProviderService,
  FileManagerConfig
} from 'ngx-filemanager-client';

@Component({
  selector: 'app-test-page',
  template: `
    <h2>File Explorer</h2>
    <div>
      <ngx-filemanager [fileSystem]="firebaseClientProvider" [config]="config">
      </ngx-filemanager>
    </div>
  `
})
export class AppTestFunctionsLocallyComponent {
  public config: FileManagerConfig = {
    initialPath: '/'
  };
  constructor(
    public firebaseClientProvider: FilesSystemProviderService
  ) {
    const bucketName = 'myspecial-bucket.appspot.com';
    const apiEndpoint = 'http://myfirebase.cloudfunction.com/files_endpoint';
    this.firebaseClientProvider.Initialize(bucketName, apiEndpoint);
  }
}
```

Enjoy! Please file an issue if there's any problems.