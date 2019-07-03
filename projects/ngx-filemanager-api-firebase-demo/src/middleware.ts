import { NextFunction, Response, Request } from 'express';
const cors = require('cors');
import * as admin from 'firebase-admin';

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

export async function LogRequest(req: Request, res: Response, next: NextFunction) {
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

export async function HasBearerToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const idTokenWithBearer = req.headers.authorization;
  if (!idTokenWithBearer) {
    const msg =
      'authorisation not valid, failed token validation, bearer token';

    console.warn(msg);
    res.status(401).send(msg);
    return;
  }
  const idToken = idTokenWithBearer.replace('Bearer ', '');
  try {
    const token = await admin.auth().verifyIdToken(idToken);
    req['token'] = token;
    next();
  } catch (e) {
    const msg =
      'authorisation not valid, failed token validation, bearer token';

    console.warn(msg);
    res.status(401).send(msg);
  }
}

