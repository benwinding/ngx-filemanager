import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function RenameFile(bucket: Bucket, item: string, newItemPath: string, claims: UserCustomClaims): Promise<import("../../../../../ngx-filemanager-core/src/public_api").ResultObj>;
