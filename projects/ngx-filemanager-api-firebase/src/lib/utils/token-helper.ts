import * as jwt from 'jsonwebtoken';

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

  try {
    const decodedToken = await DecodeJWT(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Error decoding JWT' + error);
  }
}

export async function DecodeJWT(bearer: string): Promise<{}> {
  try {
    const decoded = jwt.decode(bearer, { json: true });
    return decoded;
  } catch (err) {
    throw new Error(err);
  }
}
