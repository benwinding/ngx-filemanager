// Add middle ware to this route
const express = require('express');
import {
  OptionRequestsAreOk,
  PostRequestsOnly,
  HasBodyProp,
  HasQueryParam
} from './middleware-helpers';
import { FileManagerAction, api as ApiTypes } from '../methods/core-types';
import { Storage } from '../methods/google-cloud-types';
import { NgxFileMangerApiFireBaseClass } from '../methods/firebase-storage-api';

let api: NgxFileMangerApiFireBaseClass;

const endpoint = express();
endpoint.use(OptionRequestsAreOk);

endpoint.use('/hello', async (req, res) => {
  console.log('HELLO');
  res.status(200).send('HELLO');
});

endpoint.use(PostRequestsOnly);

import 'multer';
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
endpoint.post(
  '/upload',
  upload.single('file'),
  HasQueryParam('bucketname'),
  HasQueryParam('directoryPath'),
  async (req, res, next) => {
    const bucketname: string = req.query.bucketname;
    const directoryPath: string = req.query.directoryPath;
    const file = req.file as Express.Multer.File;
    try {
      const response = await trySaveFile(bucketname, directoryPath, file);
      res.status(200).send(response);
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
  f: Express.Multer.File
) {
  return api.HandleSaveFile(
    bucketname,
    directoryPath,
    f.originalname,
    f.mimetype,
    f.buffer
  );
}

endpoint.use(
  '/',
  HasBodyProp('action'),
  HasBodyProp('bucketname'),
  async (req, res) => {
    const action: FileManagerAction = req.body.action;
    try {
      let body;
      switch (action) {
        case 'list':
          body = await api.HandleList(req.body);
          break;
        case 'rename':
          body = await api.HandleRename(req.body);
          break;
        case 'move':
          body = await api.HandleMove(req.body);
          break;
        case 'copy':
          body = await api.HandleCopy(req.body);
          break;
        case 'remove':
          body = await api.HandleRemove(req.body);
          break;
        case 'edit':
          body = await api.HandleEdit(req.body);
          break;
        case 'getContent':
          body = await api.HandleGetContent(req.body);
          break;
        case 'createFolder':
          body = await api.HandleCreateFolder(req.body);
          break;
        case 'getMeta':
          body = await api.HandleGetMeta(req.body);
          break;
        case 'changePermissions':
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
/*
Use by attaching to a firebase function
exports.FileManagerApi = StorageEndpoint;
*/
export const FileManagerEndpointExpress = (storage: Storage) => {
  api = new NgxFileMangerApiFireBaseClass(storage);
  return endpoint;
};
