import * as fileParser from 'express-multipart-file-parser';

export const ParseUploadFile = fileParser;

export interface UploadedFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
}
