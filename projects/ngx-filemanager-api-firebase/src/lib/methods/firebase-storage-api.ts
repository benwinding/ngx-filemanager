import * as api from 'ngx-filemanager-core';
import {
  getList,
  getResult,
  getResultFromArray,
  StreamToPromise
} from '../methods/storage-helpers';
import { Storage } from './google-cloud-types';

export interface NgxFileMangerApiFireBase {
  HandleList(body: api.ReqBodyList): Promise<api.ResBodyList>;
  HandleRename(body: api.ReqBodyRename): Promise<api.ResBodyRename>;
  HandleMove(body: api.ReqBodyMove): Promise<api.ResBodyMove>;
  HandleCopy(body: api.ReqBodyCopy): Promise<api.ResBodyCopy>;
  HandleRemove(body: api.ReqBodyRemove): Promise<api.ResBodyRemove>;
  HandleEdit(body: api.ReqBodyEdit): Promise<api.ResBodyEdit>;
  HandleGetContent(body: api.ReqBodyGetContent): Promise<api.ResBodyGetContent>;
  HandleCreateFolder(
    body: api.ReqBodyCreateFolder
  ): Promise<api.ResBodyCreateFolder>;
}

export class NgxFileMangerApiFireBaseClass {
  constructor(private storage: Storage) {}

  async HandleList(body: api.ReqBodyList): Promise<api.ResBodyList> {
    const bucket = this.storage.bucket(body.bucketname);
    const resFiles = await getList(bucket, body.path);
    const response: api.ResBodyList = {
      result: resFiles
    };
    return response;
  }

  async HandleRename(body: api.ReqBodyRename): Promise<api.ResBodyRename> {
    const bucket = this.storage.bucket(body.bucketname);
    const result = await bucket.file(body.item).move(body.newItemPath);
    const resultObj = result[0];
    const response: api.ResBodyRename = {
      result: getResult(resultObj)
    };
    return response;
  }

  async HandleMove(body: api.ReqBodyMove): Promise<api.ResBodyMove> {
    const bucket = this.storage.bucket(body.bucketname);
    const moveResults = await Promise.all(
      body.items.map(filename => {
        return bucket.file(filename).copy(body.newPath);
      })
    );
    const resultObjArr = moveResults.map(r => r[1]);
    const response: api.ResBodyMove = {
      result: getResultFromArray(resultObjArr)
    };
    return response;
  }

  async HandleCopy(body: api.ReqBodyCopy): Promise<api.ResBodyCopy> {
    const bucket = this.storage.bucket(body.bucketname);
    if (body.items) {
      const moveResults = await Promise.all(
        body.items.map(filename => {
          return bucket.file(filename).move(body.newPath);
        })
      );
      const resultObjArr = moveResults.map(r => r[0]);
      const response: api.ResBodyCopy = {
        result: getResultFromArray(resultObjArr)
      };
      return response;
    } else if (body.singleFileName) {
      const result = await bucket.file(body.singleFileName).copy(body.newPath);
      const resultObj = result[1];
      const response: api.ResBodyCopy = {
        result: getResult(resultObj)
      };
      return response;
    } else {
      throw new Error(
        'Request does not contain either body.items or body.singleFileName'
      );
    }
  }

  async HandleRemove(body: api.ReqBodyRemove): Promise<api.ResBodyRemove> {
    const bucket = this.storage.bucket(body.bucketname);
    const removeResults = await Promise.all(
      body.items.map(filename => {
        return bucket.file(filename).delete();
      })
    );
    const resultObjArr = removeResults.map(r => r[0]);
    const response: api.ResBodyRemove = {
      result: getResultFromArray(resultObjArr)
    };
    return response;
  }

  async HandleEdit(body: api.ReqBodyEdit): Promise<api.ResBodyEdit> {
    const bucket = this.storage.bucket(body.bucketname);
    await bucket.file(body.item).save(body.content);
    const response: api.ResBodyEdit = {
      result: {
        success: true
      }
    };
    return response;
  }

  async HandleGetContent(
    body: api.ReqBodyGetContent
  ): Promise<api.ResBodyGetContent> {
    const bucket = this.storage.bucket(body.bucketname);
    const result = await bucket.file(body.item).get();
    const file = result[0];
    const content = await StreamToPromise(file.createReadStream());
    const response: api.ResBodyGetContent = {
      result: content
    };
    return response;
  }

  async HandleCreateFolder(
    body: api.ReqBodyCreateFolder
  ): Promise<api.ResBodyCreateFolder> {
    const bucket = this.storage.bucket(body.bucketname);
    let directoryPath = body.newPath;
    if (directoryPath.slice(-1) !== '/') {
      directoryPath += '/';
    }
    const file = bucket.file(directoryPath);
    await file.save('');
    const response: api.ResBodyCreateFolder = {
      result: {
        success: true
      }
    };
    return response;
  }
}
