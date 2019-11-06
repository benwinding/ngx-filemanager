import { Injectable } from '@angular/core';

export abstract class Logger {
  info: any;
  warn: any;
  error: any;
}

export type logFn = (message?: any, ...optionalParams: any[]) => void;

@Injectable()
export class LoggerService implements Logger {
  info: logFn;
  warn: logFn;
  error: logFn;
}
