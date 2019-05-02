import { Storage, Bucket } from '../types/google-cloud-types';
import { commands } from './commands';
import { VError } from 'verror';
import { CoreTypes } from 'ngx-filemanager-core/public_api';
async function CheckHasBodyProp(body: {}, bodyFieldName: string) {
  const exists = body[bodyFieldName];
  if (!exists) {
    throw new Error(`Request is missing property in req.body: '${bodyFieldName}'`);
  }
}

export class NgxFileMangerApiFireBaseClass {
  constructor(public storage: Storage) {}

  private async getBucket(bucketname: string): Promise<Bucket> {
    if (!bucketname) {
      throw new Error(`Request is missing property in req.body: 'bucketname'`);
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
    body: CoreTypes.ReqBodyList,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyList> {
    try {
      await CheckHasBodyProp(body, 'path');
      const bucket = await this.getBucket(body.bucketname);
      const resFiles = await commands.GetList(bucket, body.path, claims);
      const response: CoreTypes.ResBodyList = {
        result: resFiles
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleRename(
    body: CoreTypes.ReqBodyRename,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyRename> {
    try {
      await CheckHasBodyProp(body, 'item');
      await CheckHasBodyProp(body, 'newItemPath');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.RenameFile(
        bucket,
        body.item,
        body.newItemPath,
        claims
      );
      const response: CoreTypes.ResBodyRename = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleMove(
    body: CoreTypes.ReqBodyMove,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyMove> {
    try {
      const bucket = await this.getBucket(body.bucketname);
      await CheckHasBodyProp(body, 'items');
      await CheckHasBodyProp(body, 'newPath');
      const result = await commands.MoveFiles(
        bucket,
        body.items,
        body.newPath,
        claims
      );
      const response: CoreTypes.ResBodyMove = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleCopy(
    body: CoreTypes.ReqBodyCopy,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyCopy> {
    try {
      await CheckHasBodyProp(body, 'newPath');
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
      const response: CoreTypes.ResBodyCopy = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleRemove(
    body: CoreTypes.ReqBodyRemove,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyRemove> {
    try {
      await CheckHasBodyProp(body, 'items');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.RemoveFiles(bucket, body.items, claims);
      const response: CoreTypes.ResBodyRemove = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleEdit(
    body: CoreTypes.ReqBodyEdit,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyEdit> {
    try {
      await CheckHasBodyProp(body, 'item');
      await CheckHasBodyProp(body, 'content');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.EditFile(
        bucket,
        body.item,
        body.content,
        claims
      );
      const response: CoreTypes.ResBodyEdit = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleGetContent(
    body: CoreTypes.ReqBodyGetContent,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyGetContent> {
    try {
      await CheckHasBodyProp(body, 'item');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.GetFileContent(bucket, body.item, claims);
      const response: CoreTypes.ResBodyGetContent = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleGetSingle(
    body: CoreTypes.ReqBodyGetSingle,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyGetSingle> {
    try {
      await CheckHasBodyProp(body, 'item');
      const bucket = await this.getBucket(body.bucketname);
      const file = await commands.GetSingle(bucket, body.item, claims);
      const response: CoreTypes.ResBodyGetSingle = {
        result: {
          success: true,
          file: file,
          url: file.downloadUrl
        }
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleCreateFolder(
    body: CoreTypes.ReqBodyCreateFolder,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyCreateFolder> {
    try {
      await CheckHasBodyProp(body, 'newPath');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.CreateFolder(bucket, body.newPath, claims);
      const response: CoreTypes.ResBodyCreateFolder = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error);
    }
  }

  async HandleSetPermissions(
    body: CoreTypes.ReqBodySetPermissions,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodySetPermissions> {
    try {
      await CheckHasBodyProp(body, 'items');
      await CheckHasBodyProp(body, 'role');
      await CheckHasBodyProp(body, 'entity');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.ChangePermissions(
        bucket,
        body.items,
        body.role,
        body.entity,
        body.recursive,
        claims
      );
      const response: CoreTypes.ResBodySetPermissions = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error.message);
    }
  }

  async HandleSetPermissionsObject(
    body: CoreTypes.ReqBodySetPermissionsObject,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodySetPermissions> {
    try {
      await CheckHasBodyProp(body, 'items');
      await CheckHasBodyProp(body, 'role');
      await CheckHasBodyProp(body, 'entity');
      const bucket = await this.getBucket(body.bucketname);
      const result = await commands.ChangePermissionsObject(
        bucket,
        body.items,
        body.permissionsObj,
        body.recursive,
        claims
      );
      const response: CoreTypes.ResBodySetPermissions = {
        result: result
      };
      return response;
    } catch (error) {
      throw new VError(error.message);
    }
  }

  async HandleSaveFile(
    bucketname: string,
    directoryPath: string,
    originalname: string,
    mimetype: string,
    buffer: Buffer,
    claims: CoreTypes.UserCustomClaims
  ): Promise<CoreTypes.ResBodyUploadFile> {
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
      throw new VError(error);
    }
  }
}
