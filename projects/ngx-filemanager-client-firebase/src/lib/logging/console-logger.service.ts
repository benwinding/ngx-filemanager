import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable()
export class ConsoleLoggerService implements Logger {
  get info() {
    const boundLogFn = console.log.bind(console, 'ngx-fm:: ');
    return boundLogFn;
  }

  get warn() {
    const boundLogFn = console.warn.bind(console, 'ngx-fm:: ');
    return boundLogFn;
  }

  get error() {
    const boundLogFn = console.error.bind(console, 'ngx-fm:: ');
    return boundLogFn;
  }
}
