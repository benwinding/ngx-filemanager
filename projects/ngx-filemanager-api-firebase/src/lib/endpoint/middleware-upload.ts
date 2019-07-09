import { NextFunction } from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';
import { Files } from 'formidable';

export const ParseUploadFile = async (req, res, next: NextFunction) => {
  try {
    const form = new formidable.IncomingForm();
    const files = await new Promise<formidable.File[]>((resolve, reject) => {
      form.parse(req, function(err, fields, fieldFileMap: Files) {
        const fileArray = Object.values(fieldFileMap) as formidable.File[];
        resolve(fileArray);
      });
    });
    const convertedFiles = await Promise.all(
      files.map(f => convertToFileAndBuffer(f))
    );
    req.files = convertedFiles;
    next();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

async function convertToFileAndBuffer(
  f: formidable.File
): Promise<UploadedFile> {
  const fileBuffer = await new Promise<Buffer>((resolve, reject) =>
    fs.readFile(f.path, function(err, buffer) {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    })
  );
  fs.unlinkSync(f.path);
  return {
    buffer: fileBuffer,
    mimetype: f.type,
    originalname: f.name,
    hash: f.hash
  };
}

export interface UploadedFile {
  buffer: Buffer;
  hash: string;
  mimetype: string;
  originalname: string;
}
