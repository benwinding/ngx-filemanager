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

export async function LogBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  console.log('body: ' + JSON.stringify(body, null, 4));
  next();
}
