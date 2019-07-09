const { fileParser } = require('express-multipart-file-parser');

export const ParseUploadFile = fileParser({
  rawBodyOptions: {
    limit: '100mb',
  }
});

export interface UploadedFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
}
