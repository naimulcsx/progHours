import { ParseResult } from "../types/ParseResult";

export abstract class OJParser<TUrlParams> {
  public url: string;
  constructor(url: string) {
    this.url = url;
  }
  abstract getUrlParams(): TUrlParams;
  abstract parse(): Promise<ParseResult>;
}
