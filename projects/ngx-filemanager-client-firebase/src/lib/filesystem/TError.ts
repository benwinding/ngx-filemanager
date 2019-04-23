export const GetStackTrace = function() {
  const obj = {};
  const e = Error as any;
  e.captureStackTrace(obj, GetStackTrace);
  return obj['stack'];
};

export class TError extends Error {
  name: string;
  message: string;
  stack?: string;
  constructor(parentError: Error, stack: string, msg?: string) {
    super(msg);
    this.message = msg;
    const currentStack = stack;
    this.stack = `
${currentStack}
  ||
  LL Caused by ==> : ${parentError.message}
      ${parentError.stack}
`;
  }
}
