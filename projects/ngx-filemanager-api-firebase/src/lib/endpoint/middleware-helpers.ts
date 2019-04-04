import { Request, Response, NextFunction, RequestHandler } from 'express';

export function OptionRequestsAreOk(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    console.log('Recieved OPTIONS request sending OK');
    res.status(200).send('Options are OK');
    return;
  }
  next();
}

export function PostRequestsOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method !== 'POST') {
    const msg = 'Only POST requests are supported';
    console.warn(msg);
    res.status(400).send(msg);
    return;
  }
  next();
}

export function HasBodyProp(bodyFieldName: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body[bodyFieldName]) {
      const msg = 'Request is missing property in req.body: ' + bodyFieldName;
      console.warn(msg);
      res.status(400).send(msg);
      return;
    }
    next();
  };
}
