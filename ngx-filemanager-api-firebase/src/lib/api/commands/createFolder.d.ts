import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function CreateFolder(bucket: Bucket, newDirectoryPath: string, claims: UserCustomClaims): Promise<{
    success: boolean;
}>;
