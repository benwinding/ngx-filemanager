import { Storage, Bucket } from '../types/google-cloud-types';
import * as commands from './commands';
import {
  ReqBodyList,
  UserCustomClaims,
  ResBodyList,
  ReqBodyRename,
  ResBodyRename,
  ReqBodyMove,
  ResBodyMove,
  ReqBodyCopy,
  ResBodyCopy,
  ReqBodyRemove,
  ResBodyRemove,
  ReqBodyEdit,
  ResBodyEdit,
  ReqBodyGetContent,
  ResBodyGetContent,
  ReqBodyGetMeta,
  ResBodyGetMeta,
  ReqBodyCreateFolder,
  ResBodyCreateFolder,
  ReqBodySetPermissions,
  ResBodySetPermissions,
  ResBodyUploadFile
} from 'ngx-filemanager-core/public_api';

export class NgxFileMangerApiFireBaseClass {
  constructor(public storage: Storage) {}

  private async getBucket(bucketname: string): Promise<Bucket> {
    if (!bucketname) {
      throw new Error('No bucketname provided');
    }
    try {
      const bucket = this.storage.bucket(bucketname);
      const exists = (await bucket.exists()).shift();
      if (!exists) {
        throw new Error(
          `bucket: "${bucketname}" doesn't exist, please create it first`
        );
      }
      return bucket;
    } catch (error) {
      throw new Error('Error retrieving bucket: ' + error.message);
    }
  }

  async HandleList(
    body: ReqBodyList,
    claims: UserCustomClaims
  ): Promise<ResBodyList> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const resFiles = await commands.GetList(bucket, body.path, claims);
      const response: ResBodyList = {
        result: resFiles
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleRename(
    body: ReqBodyRename,
    claims: UserCustomClaims
  ): Promise<ResBodyRename> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.RenameFile(
        bucket,
        body.item,
        body.newItemPath,
        claims
      );
      const response: ResBodyRename = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleMove(
    body: ReqBodyMove,
    claims: UserCustomClaims
  ): Promise<ResBodyMove> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.MoveFiles(
        bucket,
        body.items,
        body.newPath,
        claims
      );
      const response: ResBodyMove = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleCopy(
    body: ReqBodyCopy,
    claims: UserCustomClaims
  ): Promise<ResBodyCopy> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      let filesToCopy;
      if (body.items) {
        filesToCopy = body.items;
      } else if (body.singleFileName) {
        filesToCopy = [body.singleFileName];
      } else {
        throw new Error(
          'Request does not contain either body.items or body.singleFileName'
        );
      }
      const result = await commands.CopyFiles(
        bucket,
        filesToCopy,
        body.newPath,
        claims
      );
      const response: ResBodyCopy = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleRemove(
    body: ReqBodyRemove,
    claims: UserCustomClaims
  ): Promise<ResBodyRemove> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.RemoveFiles(bucket, body.items, claims);
      const response: ResBodyRemove = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleEdit(
    body: ReqBodyEdit,
    claims: UserCustomClaims
  ): Promise<ResBodyEdit> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.EditFile(
        bucket,
        body.item,
        body.content,
        claims
      );
      const response: ResBodyEdit = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleGetContent(
    body: ReqBodyGetContent,
    claims: UserCustomClaims
  ): Promise<ResBodyGetContent> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.GetFileContent(bucket, body.item, claims);
      const response: ResBodyGetContent = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleGetMeta(
    body: ReqBodyGetMeta,
    claims: UserCustomClaims
  ): Promise<ResBodyGetMeta> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const downloadUrl = await commands.GetFileMeta(bucket, body.item, claims);
      const response: ResBodyGetMeta = {
        result: {
          success: true
        }
      };
      response.result.url = downloadUrl;
      response.result.success = true;
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleCreateFolder(
    body: ReqBodyCreateFolder,
    claims: UserCustomClaims
  ): Promise<ResBodyCreateFolder> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.CreateFolder(bucket, body.newPath, claims);
      const response: ResBodyCreateFolder = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleSetPermissions(
    body: ReqBodySetPermissions,
    claims: UserCustomClaims
  ): Promise<ResBodySetPermissions> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.ChangePermissions(
        bucket,
        body.items,
        body.role,
        body.entity,
        body.recursive,
        claims
      );
      const response: ResBodySetPermissions = {
        result: result
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async HandleSaveFile(
    bucketname: string,
    directoryPath: string,
    originalname: string,
    mimetype: string,
    buffer: Buffer,
    claims: UserCustomClaims
  ): Promise<ResBodyUploadFile> {
    try {
      const bucket = await this.getBucket(bucketname);
      await commands.UploadFile(
        bucket,
        directoryPath,
        originalname,
        mimetype,
        buffer,
        claims
      );
      const result = {
        result: {
          success: true
        }
      };
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
