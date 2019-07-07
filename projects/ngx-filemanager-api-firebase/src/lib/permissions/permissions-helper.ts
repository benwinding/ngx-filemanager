import { VError } from 'verror';
import { File } from '../types/google-cloud-types';
import { SetMetadataResponse } from '@google-cloud/common';

async function SetMetaPropertyString(
  file: File,
  key: string,
  newValueString: string
): Promise<any> {
  try {
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
      newValueString
    });
    throw new Error(error);
  }
}

async function SetMetaPropertyObj(
  file: File,
  key: string,
  newValue: {}
): Promise<{}> {
  try {
    const newValueString = JSON.stringify(newValue);
    return SetMetaPropertyString(file, key, newValueString);
  } catch (error) {
    throw new Error(error);
  }
}

async function GetMetaPropertyString(file: File, key: string): Promise<string> {
  let newValueString;
  try {
    const [meta] = await file.getMetadata();
    const metaData = meta.metadata || {};
    newValueString = metaData[key] || null;
    return newValueString;
  } catch (error) {
    try {
      const [fileExists] = await file.exists();
    } catch (error) {
      console.error(error);
    }
    console.error('storage-helper: GetMetaProperty() error getting meta', {});
    throw new VError(error);
  }
}

async function GetMetaPropertyObj<T>(file: File, key: string): Promise<T> {
  let newValueString;
  try {
    newValueString = await GetMetaPropertyString(file, key);
    const newValueObj = JSON.parse(newValueString);
    return newValueObj;
  } catch (error) {
    console.error(
      `could not convert the meta property "${key}" to a JSON object`,
      error,
      { newValueString }
    );
    throw new VError(error + ' error in JSON processing: ' + newValueString);
  }
}

export const permHelper = {
  GetMetaPropertyObj: GetMetaPropertyObj,
  SetMetaPropertyObj: SetMetaPropertyObj,
  GetMetaPropertyString: GetMetaPropertyString,
  SetMetaPropertyString: SetMetaPropertyString,
};
