import { api } from './core-types';
import { Storage, Bucket } from './google-cloud-types';
import * as commands from './commands';

export class NgxFileMangerApiFireBaseClass {
  constructor(private storage: Storage) {}

  private async getBucket(bucketname: string): Promise<Bucket> {
    if (!bucketname) {
      throw new Error('No bucketname provided');
    }
    const bucket = this.storage.bucket(bucketname);
    const exists = (await bucket.exists()).shift();
    if (!exists) {
      throw new Error('The bucket: ' + bucketname + ' does not exist');
    }
    return bucket;
  }

  async HandleList(body: api.ReqBodyList): Promise<api.ResBodyList> {
    const bucket = await this.getBucket(body.bucketname);
    const resFiles = await commands.GetList(bucket, body.path);
    const response: api.ResBodyList = {
      result: resFiles
    };
    return response;
  }

  async HandleRename(body: api.ReqBodyRename): Promise<api.ResBodyRename> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.RenameFile(
      bucket,
      body.item,
      body.newItemPath
    );
    const response: api.ResBodyRename = {
      result: result
    };
    return response;
  }

  async HandleMove(body: api.ReqBodyMove): Promise<api.ResBodyMove> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.MoveFiles(bucket, body.items, body.newPath);
    const response: api.ResBodyMove = {
      result: result
    };
    return response;
  }

  async HandleCopy(body: api.ReqBodyCopy): Promise<api.ResBodyCopy> {
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
    const result = await commands.CopyFiles(bucket, filesToCopy, body.newPath);
    const response: api.ResBodyCopy = {
      result: result
    };
    return response;
  }

  async HandleRemove(body: api.ReqBodyRemove): Promise<api.ResBodyRemove> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.RemoveFiles(bucket, body.items);
    const response: api.ResBodyRemove = {
      result: result
    };
    return response;
  }

  async HandleEdit(body: api.ReqBodyEdit): Promise<api.ResBodyEdit> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.EditFile(bucket, body.item, body.content);
    const response: api.ResBodyEdit = {
      result: result
    };
    return response;
  }

  async HandleGetContent(
    body: api.ReqBodyGetContent
  ): Promise<api.ResBodyGetContent> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.GetFileContent(bucket, body.item);
    const response: api.ResBodyGetContent = {
      result: result
    };
    return response;
  }

  async HandleGetMeta(body: api.ReqBodyGetMeta): Promise<api.ResBodyGetMeta> {
    const bucket = await this.getBucket(body.bucketname);
    const response: api.ResBodyGetMeta = {
      result: {
        success: null
      }
    };
    try {
      const downloadUrl = await commands.GetFileMeta(bucket, body.item);
      response.result.url = downloadUrl;
      response.result.success = true;
    } catch (error) {
      response.result.success = false;
      response.result.error = error.message;
    }
    return response;
  }

  async HandleCreateFolder(
    body: api.ReqBodyCreateFolder
  ): Promise<api.ResBodyCreateFolder> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.CreateFolder(bucket, body.newPath);
    const response: api.ResBodyCreateFolder = {
      result: result
    };
    return response;
  }

  async HandleSetPermissions(
    body: api.ReqBodySetPermissions
  ): Promise<api.ResBodySetPermissions> {
    const bucket = await this.getBucket(body.bucketname);
    const result = await commands.ChangePermissions(
      bucket,
      body.items,
      body.perms,
      body.recursive
    );
    const response: api.ResBodySetPermissions = {
      result: result
    };
    return response;
  }

  async HandleSaveFile(
    bucketname: string,
    directoryPath: string,
    originalname: string,
    mimetype: string,
    buffer: Buffer
  ): Promise<api.ResBodyUploadFile> {
    const bucket = await this.getBucket(bucketname);
    await commands.UploadFile(
      bucket,
      directoryPath,
      originalname,
      mimetype,
      buffer
    );
    const result = {
      result: {
        success: true
      }
    };
    return result;
  }
}
