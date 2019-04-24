/// <reference types="request" />
import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function moveWithChildren(bucket: Bucket, itemPath: string, newFolderPrefix: string): Promise<import("request").Response[]>;
export declare function MoveFiles(bucket: Bucket, items: string[], newDirectoryPath: string, claims: UserCustomClaims): Promise<import("../../../../../ngx-filemanager-core/src/public_api").ResultObj>;
