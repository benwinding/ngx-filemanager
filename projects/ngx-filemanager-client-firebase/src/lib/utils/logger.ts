export class SimpleLog {
  constructor(private title: string, private debug?: boolean) {}

  public get log() {
    if (!this.debug) {
      return (...any) => {};
    }
    const boundLogFn: (...any) => void = console.log.bind(
      console,
      this.title
    );
    return boundLogFn;
  }

  public get warn() {
    if (!this.debug) {
      return (...any) => {};
    }
    const boundLogFn: (...any) => void = console.warn.bind(
      console,
      this.title
    );
    return boundLogFn;
  }

  public get error() {
    if (!this.debug) {
      return (...any) => {};
    }
    const boundLogFn: (...any) => void = console.error.bind(
      console,
      this.title
    );
    return boundLogFn;
  }
}
