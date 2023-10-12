import { ParseResult } from "../types/ParseResult";

export abstract class OJParser<TUrlParams> {
  abstract getUrlParams(url: string): TUrlParams;
  abstract parse(url: string): Promise<ParseResult>;
}
