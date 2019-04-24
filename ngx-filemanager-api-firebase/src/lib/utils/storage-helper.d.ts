/// <reference types="request" />
import { Bucket, File } from '../types/google-cloud-types';
export declare function GetAllChildrenWithPrefix(bucket: Bucket, fileOrDirectoryPath: string): Promise<File[]>;
export declare function TryRenameFile(file: File, oldPrefix: string, newPrefix: string): Promise<import("request").Response>;
export declare function TryCopyFile(file: File, oldPrefix: string, newPrefix: string): Promise<import("request").Response>;
export declare function SetMetaProperty(file: File, key: string, newValue: {}): Promise<any>;
export declare function GetMetaProperty(file: File, key: string): Promise<any>;
