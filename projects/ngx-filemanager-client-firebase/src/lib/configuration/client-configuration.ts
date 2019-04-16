import {Observable} from 'rxjs';

export interface NameUid {
  name: string;
  uid: string;
}

export interface FileManagerConfig {
  initialPath: string; // Firebase functions endpoint
  users?: Observable<NameUid[]>;
  groups?: Observable<NameUid[]>;
  me?: Observable<NameUid>;
}
