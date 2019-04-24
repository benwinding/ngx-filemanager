import { Storage } from '../types/google-cloud-types';
import { ReqBodyList, UserCustomClaims, ResBodyList, ReqBodyRename, ResBodyRename, ReqBodyMove, ResBodyMove, ReqBodyCopy, ResBodyCopy, ReqBodyRemove, ResBodyRemove, ReqBodyEdit, ResBodyEdit, ReqBodyGetContent, ResBodyGetContent, ReqBodyGetMeta, ResBodyGetMeta, ReqBodyCreateFolder, ResBodyCreateFolder, ReqBodySetPermissions, ResBodySetPermissions, ResBodyUploadFile } from 'ngx-filemanager-core/public_api';
export declare class NgxFileMangerApiFireBaseClass {
    storage: Storage;
    constructor(storage: Storage);
    private getBucket;
    HandleList(body: ReqBodyList, claims: UserCustomClaims): Promise<ResBodyList>;
    HandleRename(body: ReqBodyRename, claims: UserCustomClaims): Promise<ResBodyRename>;
    HandleMove(body: ReqBodyMove, claims: UserCustomClaims): Promise<ResBodyMove>;
    HandleCopy(body: ReqBodyCopy, claims: UserCustomClaims): Promise<ResBodyCopy>;
    HandleRemove(body: ReqBodyRemove, claims: UserCustomClaims): Promise<ResBodyRemove>;
    HandleEdit(body: ReqBodyEdit, claims: UserCustomClaims): Promise<ResBodyEdit>;
    HandleGetContent(body: ReqBodyGetContent, claims: UserCustomClaims): Promise<ResBodyGetContent>;
    HandleGetMeta(body: ReqBodyGetMeta, claims: UserCustomClaims): Promise<ResBodyGetMeta>;
    HandleCreateFolder(body: ReqBodyCreateFolder, claims: UserCustomClaims): Promise<ResBodyCreateFolder>;
    HandleSetPermissions(body: ReqBodySetPermissions, claims: UserCustomClaims): Promise<ResBodySetPermissions>;
    HandleSaveFile(bucketname: string, directoryPath: string, originalname: string, mimetype: string, buffer: Buffer, claims: UserCustomClaims): Promise<ResBodyUploadFile>;
}
