import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function GetFileContent(bucket: Bucket, item: string, claims: UserCustomClaims): Promise<string>;
