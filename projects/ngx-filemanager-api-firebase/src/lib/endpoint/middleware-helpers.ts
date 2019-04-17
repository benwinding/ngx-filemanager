import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Bucket, Storage } from '../types/google-cloud-types';

export function OptionRequestsAreOk(
  req: Request,
  res: Response,
  next: NextFunction
): RequestHandler {
  if (req.method === 'OPTIONS') {
    console.log('Recieved OPTIONS request sending OK');
    res.status(200).send('Options are OK\n');
    return;
  }
  next();
}

export function PostRequestsOnly(
  req: Request,
  res: Response,
  next: NextFunction
): RequestHandler {
  if (req.method !== 'POST') {
    const msg = 'Only POST requests are supported\n';
    console.warn(msg);
    res.status(400).send(msg);
    return;
  }
  next();
}

export function HasBodyProp(bodyFieldName: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body[bodyFieldName]) {
      const msg = 'Request is missing property in req.body: ' + bodyFieldName + '\n';
      console.warn(msg);
      res.status(400).send(msg);
      return;
    }
    next();
  };
}

export function HasQueryParam(paramName: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.query[paramName]) {
      const msg = 'Request is missing property in req.params: ' + paramName + '\n';
      console.warn(msg);
      res.status(400).send(msg);
      return;
    }
    next();
  };
}
