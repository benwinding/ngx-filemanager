import * as path from 'path';
import * as request from 'request';
import { VError } from 'verror';
import { GetFilesOptions } from '@google-cloud/storage';

import { Bucket, File, FileFromStorage } from '../types/google-cloud-types';

async function SetMetaProperty(
  file: File,
  key: string,
  newValue: {}
): Promise<any> {
  try {
    const newValueString = JSON.stringify(newValue);
    const metaObj = { metadata: {} };
    metaObj.metadata[key] = newValueString;
    const res = await file.setMetadata(metaObj);
    return res[0];
  } catch (error) {
    let fileExists: boolean;
    try {
      [fileExists] = await file.exists();
    } catch (e) {
      console.error(
        'storage-helper: SetMetaProperty() error getting file.exists',
        e
      );
    }
    console.error('storage-helper: SetMetaProperty() error setting meta', {
      fileExists,
      filePath: file.name,
      newValue
    });
    throw new Error(error);
  }
}

async function GetMetaProperty(file: File, key: string): Promise<any> {
  let newValueString;
  try {
    const [meta] = await file.getMetadata();
    const metaData = meta.metadata || {};
    newValueString = metaData[key] || null;
  } catch (error) {
    const [fileExists] = await file.exists();
    console.error('storage-helper: GetMetaProperty() error getting meta', {
      fileExists
    });
    throw new VError(error);
  }
  try {
    const newValueObj = JSON.parse(newValueString);
    return newValueObj;
  } catch (error) {
    console.error(
      `could not convert the meta property "${key}" to a JSON object`,
      error
    );
    return newValueString;
  }
}

export const permHelper = {
  GetMetaProperty,
  SetMetaProperty
};
