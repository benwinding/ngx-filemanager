import { Bucket, File } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import '@firebase/storage';
export interface FileFromStorage {
    ref: File;
    isDir: boolean;
    isPhantomFolder?: boolean;
    name: string;
    fullPath: string;
}
declare type Storage = admin.storage.Storage;
export { Bucket, File, Storage };
