export abstract class StatisticsParser<TResult> {
  protected handle: string;

  getHandle() {
    return this.handle;
  }

  setHandle(handle: string) {
    this.handle = handle;
    return this;
  }

  abstract parse(): Promise<TResult>;
}
