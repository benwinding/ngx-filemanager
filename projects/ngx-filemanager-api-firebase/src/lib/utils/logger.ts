import * as CICULAR from 'circular-json';

export function logObj(obj) {
  console.log(CICULAR.stringify(obj, null, 2));
}
