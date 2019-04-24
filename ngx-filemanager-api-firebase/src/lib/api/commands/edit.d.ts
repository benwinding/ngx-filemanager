import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function EditFile(bucket: Bucket, item: string, content: string, claims: UserCustomClaims): Promise<{
    success: boolean;
}>;
