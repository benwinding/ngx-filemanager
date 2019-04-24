import { Bucket } from '../../types/google-cloud-types';
import { UserCustomClaims } from 'ngx-filemanager-core/public_api';
export declare function UploadFile(bucket: Bucket, directoryPath: string, originalname: string, mimetype: string, buffer: Buffer, claims: UserCustomClaims): Promise<void>;
