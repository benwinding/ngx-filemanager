import { NextFunction, Response, Request } from 'express';
const cors = require('cors');

export async function AddCors(req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name'
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  await new Promise((resolve, reject) => {
    cors({ origin: true })(req, res, () => {
      resolve();
    });
  });
  next();
}

export async function LogRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const msg = `
---- request: ${req.url}
query: ${JSON.stringify(req.query, null, 4)}
 body: ${JSON.stringify(body, null, 4)}
----`;
  console.log(msg);
  next();
}
