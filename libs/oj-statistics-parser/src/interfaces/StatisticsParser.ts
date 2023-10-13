import { ParseResult } from "../types/ParseResult";

export type StatisticsParserOpts = {
  handle: string;
};

export interface StatisticsParser {
  getHandle(): string;
  setHandle(opt: StatisticsParserOpts): StatisticsParser;
  fetch(): Promise<ParseResult>;
}
