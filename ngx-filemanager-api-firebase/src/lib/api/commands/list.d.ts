import { Bucket, FileFromStorage, File } from '../../types/google-cloud-types';
import { GetFilesOptions } from '@google-cloud/storage';
import { UserCustomClaims, ResFile } from 'ngx-filemanager-core/public_api';
interface FilesAndPrefixes {
    files: File[];
    prefixes: string[];
}
export declare function MakeOptionsListRoot(): GetFilesOptions;
export declare function MakeOptionsList(inputDirectoryPath: string): any;
export declare function GetFilesAndPrefixes(bucket: Bucket, options: GetFilesOptions): Promise<FilesAndPrefixes>;
export declare function GetFiles(bucket: Bucket, options: GetFilesOptions): Promise<FileFromStorage[]>;
export declare function GetListFromStorage(bucket: Bucket, inputDirectoryPath: string): Promise<FileFromStorage[]>;
export declare function GetList(bucket: Bucket, inputDirectoryPath: string, claims: UserCustomClaims): Promise<ResFile[]>;
export {};
