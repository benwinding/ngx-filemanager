// Add middle ware to this route
const express = require('express');
import {
  OptionRequestsAreOk,
  PostRequestsOnly,
  HasBodyProp,
  HasQueryParam
} from './middleware-helpers';
import { Storage } from '../types/google-cloud-types';
import { NgxFileMangerApiFireBaseClass } from '../api/firebase-storage-api';

let fmApi: NgxFileMangerApiFireBaseClass;

const endpoint = express();
endpoint.use(OptionRequestsAreOk);

endpoint.use('/hello', async (req, res) => {
  console.log('HELLO');
  res.status(200).send('HELLO');
});

endpoint.use(PostRequestsOnly);

import { ParseUploadFile, UploadedFile } from './middleware-upload';
import { RetrieveCustomClaims } from '../utils/permissions-helper';
import {
  UserCustomClaims,
  FileManagerAction
} from 'ngx-filemanager-core';
endpoint.post(
  '/upload',
  HasQueryParam('bucketname'),
  HasQueryParam('directoryPath'),
  ParseUploadFile,
  async (req, res, next) => {
    const bucketname: string = req.query.bucketname;
    const directoryPath: string = req.query.directoryPath;
    const files = req.files as UploadedFile[];
    const userClaims = await RetrieveCustomClaims(req);
    try {
      const results = await Promise.all(
        files.map(file =>
          trySaveFile(bucketname, directoryPath, file, userClaims)
        )
      );
      const success = {
        result: {
          success: true
        }
      };
      const finalResult = results.reduce((acc, cur) => {
        if (cur.result.error) {
          return cur;
        }
        return success;
      }, success);
      res.status(200).send(finalResult);
    } catch (error) {
      console.log('Error occurred while uploading: ', { error });
      res.status(400).send('Error while uploading: ' + error.message);
      return;
    }
  }
);

async function trySaveFile(
  bucketname: string,
  directoryPath: string,
  f: UploadedFile,
  userClaims: UserCustomClaims
) {
  return fmApi.HandleSaveFile(
    bucketname,
    directoryPath,
    f.originalname,
    f.mimetype,
    f.buffer,
    userClaims
  );
}

endpoint.use(
  '/',
  HasBodyProp('action'),
  HasBodyProp('bucketname'),
  async (req, res) => {
    const action: FileManagerAction = req.body.action;
    const userClaims = await RetrieveCustomClaims(req);
    try {
      let body;
      switch (action) {
        case 'list':
          body = await fmApi.HandleList(req.body, userClaims);
          break;
        case 'rename':
          body = await fmApi.HandleRename(req.body, userClaims);
          break;
        case 'move':
          body = await fmApi.HandleMove(req.body, userClaims);
          break;
        case 'copy':
          body = await fmApi.HandleCopy(req.body, userClaims);
          break;
        case 'remove':
          body = await fmApi.HandleRemove(req.body, userClaims);
          break;
        case 'edit':
          body = await fmApi.HandleEdit(req.body, userClaims);
          break;
        case 'getContent':
          body = await fmApi.HandleGetContent(req.body, userClaims);
          break;
        case 'createFolder':
          body = await fmApi.HandleCreateFolder(req.body, userClaims);
          break;
        case 'getMeta':
          body = await fmApi.HandleGetMeta(req.body, userClaims);
          break;
        case 'changePermissions':
          body = await fmApi.HandleSetPermissions(req.body, userClaims);
          break;
        case 'compress':
        case 'extract':
        case 'downloadMultiple':
        default:
          throw new Error('action has not been implemented');
      }
      res.status(200).send(body);
    } catch (error) {
      const returnedErrorMsg = `Bad request!
Error: ${error.msg},
body.action: ${req.body.action},
body: ${JSON.stringify(req.body)}
`;
      console.error({ returnedErrorMsg, error });
      res.status(400).send(returnedErrorMsg);
    }
  }
);
endpoint.use(notImplemented);

async function notImplemented(req, res) {
  const bodyString = JSON.stringify(req.body);
  res.status(501).send('That request has not been implemented: ' + bodyString);
}

function CheckStorageInitialized(storage: Storage) {
  // storage.app();
}
/*
Use by attaching to a firebase function
exports.FileManagerApi = StorageEndpoint;
*/
export const FileManagerEndpointExpress = (storage: Storage) => {
  fmApi = new NgxFileMangerApiFireBaseClass(storage);
  return endpoint;
};
