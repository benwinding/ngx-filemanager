import { NgxFilemanagerClientFirebaseModule } from './lib/ngx-filemanager-client-firebase.module';
import {
  FileManagerConfig,
  NameUid
} from './lib/configuration/client-configuration';
import { ServerFilesystemProviderService } from './lib/state/pure/server-filesystem.service';
import { FileSystemStub } from './lib/state/stub/stub-filesystem.class';

/*
 * Public API Surface of ngx-filemanager-client-firebase
 */

export {
  NgxFilemanagerClientFirebaseModule,
  NameUid,
  FileManagerConfig,
  ServerFilesystemProviderService,
  FileSystemStub
};
