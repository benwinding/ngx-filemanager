import { Request, Response, NextFunction, RequestHandler } from 'express';
const cors = require('cors');

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
      const msg = `Request is missing property in req.body: "${bodyFieldName}" \n`;
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
      const msg = `Request is missing property in req.params: "${paramName}" \n`;
      console.warn(msg);
      res.status(400).send(msg);
      return;
    }
    next();
  };
}

export async function AddCors(req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name'
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    await new Promise((resolve, reject) => {
      cors({ origin: true })(req, res, () => {
        resolve();
      });
    });
    next();
  } catch (error) {
    throw new Error(error.message);
  }
}

export function LogRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const msg = `
---- request: ${req.url}
method: ${req.method}
 query: ${JSON.stringify(req.query, null, 4)}
  body: ${JSON.stringify(body, null, 4)}
----`;
  console.log(msg);
  next();
}
