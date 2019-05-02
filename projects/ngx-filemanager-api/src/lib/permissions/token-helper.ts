import * as jwt from 'jsonwebtoken';
import { CoreTypes } from 'ngx-filemanager-core/public_api';

export async function GetTokenFromRequest(req: Request) {
  let idToken;
  const isInHeader =
    req.headers['authorization'] &&
    req.headers['authorization'].startsWith('Bearer ');
  const hasCookie = req['cookies'];

  if (isInHeader) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers['authorization'].split('Bearer ')[1];
  } else if (hasCookie) {
    // Read the ID Token from cookie.
    idToken = req['cookies'].__session;
  } else {
    throw new Error(
      'Request Header doesn\'t contain a valid authorization bearer'
    );
  }

  const decodedToken = await DecodeJWT(idToken);
  return decodedToken as CoreTypes.UserCustomClaims;
}

export async function DecodeJWT(bearer: string): Promise<{}> {
  try {
    const decoded = jwt.decode(bearer, { json: true });
    return decoded;
  } catch (error) {
    throw new Error('Error decoding JWT' + error.message);
  }
}
