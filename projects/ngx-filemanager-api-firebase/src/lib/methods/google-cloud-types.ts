import { Bucket, File } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import '@firebase/storage';

type Storage = admin.storage.Storage;
export { Bucket, File, Storage };
