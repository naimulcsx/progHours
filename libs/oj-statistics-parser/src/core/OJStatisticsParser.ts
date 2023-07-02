import { CodeforcesParser } from "../parsers/codeforces";
import { ParseResult } from "../types/ParseResult";

export type ParserFetchArgs = {
  judge: string;
  handle: string;
};

export class OJStatisticsParser {
  async parse({ judge, handle }: ParserFetchArgs): Promise<ParseResult> {
    if (judge === "codeforces") {
      const parser = new CodeforcesParser();
      const result = await parser.set({ handle }).fetch();
      return result;
    }
    throw new Error("Invalid online judge");
  }
}
