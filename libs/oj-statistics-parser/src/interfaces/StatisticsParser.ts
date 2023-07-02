import { ParseResult } from "../types/ParseResult";

export type StatisticsParserOpts = {
  handle: string;
};

export interface StatisticsParser {
  getHandle(): string;
  set(opt: StatisticsParserOpts): StatisticsParser;
  fetch(): Promise<ParseResult>;
}
