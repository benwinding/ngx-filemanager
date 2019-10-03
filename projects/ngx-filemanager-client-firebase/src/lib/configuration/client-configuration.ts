import {Observable} from 'rxjs';

export interface NameUid {
  name: string;
  uid: string;
}

export interface FileManagerConfig {
  virtualRoot: string; // Users can't navigate above this root

  bucketName: string; // For uploads
  firebaseConfig: {}; // For uploads
  firebaseApp?: firebase.app.App; // For uploads

  disableLogging?: boolean;
  initialPath?: string;

  users?: Observable<NameUid[]>;
  groups?: Observable<NameUid[]>;
  me?: Observable<NameUid>;
}
