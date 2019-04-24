import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function GetFileMeta(bucket: Bucket, item: string, claims: UserCustomClaims): Promise<string>;
