// Add middle ware to this route
const express = require('express');
import * as admin from 'firebase-admin';
import {
  OptionRequestsAreOk,
  PostRequestsOnly,
  HasBodyProp
} from './middleware-helpers';
import { FileManagerAction } from '../methods/core-types';
import { NgxFileMangerApiFireBaseClass } from '../methods/firebase-storage-api';

const api = new NgxFileMangerApiFireBaseClass(admin.storage());

const endpoint = express();
endpoint.use(OptionRequestsAreOk);

endpoint.get('/hello', async (req, res) => {
  console.log('HELLO');
  res.status(200).send('HELLO');
});

endpoint.use(PostRequestsOnly);
endpoint.use(HasBodyProp('action'));
endpoint.use(HasBodyProp('bucketname'));

endpoint.use('/', async (req, res) => {
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
});
endpoint.use(notImplemented);

async function notImplemented(req, res) {
  const bodyString = JSON.stringify(req.body);
  res.status(501).send('That request has not been implemented: ' + bodyString);
}
/*
Use by attaching to a firebase function

exports.FileManagerApi = StorageEndpoint;
*/
export const FileManagerEndpointExpress = endpoint;
