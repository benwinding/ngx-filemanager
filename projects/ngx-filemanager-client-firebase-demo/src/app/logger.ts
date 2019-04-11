export class ConsoleLoggerService {
  get info() {
    const boundLogFn = console.log.bind(console, 'demo app:: ');
    return boundLogFn;
  }

  get warn() {
    const boundLogFn = console.warn.bind(console, 'demo app:: ');
    return boundLogFn;
  }

  get error() {
    const boundLogFn = console.error.bind(console, 'demo app:: ');
    return boundLogFn;
  }
}
