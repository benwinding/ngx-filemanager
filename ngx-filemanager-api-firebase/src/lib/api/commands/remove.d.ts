import { Bucket, File } from '../../types/google-cloud-types';
import { UserCustomClaims, ResultObj } from 'ngx-filemanager-core/public_api';
export declare function tryDeleteFile(file: File): Promise<boolean>;
export declare function RemoveFileWithChildren(bucket: Bucket, itemPath: string): Promise<boolean>;
export declare function RemoveFiles(bucket: Bucket, items: string[], claims: UserCustomClaims): Promise<ResultObj>;
