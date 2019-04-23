import {Observable} from 'rxjs';

export interface NameUid {
  name: string;
  uid: string;
}

export interface FileManagerConfig {
  virtualRoot: string; // Users can't navigate above this root
  initialPath?: string; // Firebase functions endpoint
  users?: Observable<NameUid[]>;
  groups?: Observable<NameUid[]>;
  me?: Observable<NameUid>;
}
