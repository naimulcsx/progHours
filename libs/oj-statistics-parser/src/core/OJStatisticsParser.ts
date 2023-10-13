import { CodeforcesParser } from "../parsers/codeforces.parser";
import { ParseResult } from "../types/ParseResult";

export type ParserFetchArgs = {
  judge: string;
  handle: string;
};

const UNSUPPORTED_ONLINE_JUDGE_ERROR = "Unsupported Online Judge";

export class OJStatisticsParser {
  async parse({ judge, handle }: ParserFetchArgs): Promise<ParseResult> {
    if (judge === "codeforces") {
      const parser = new CodeforcesParser();
      const result = await parser.setHandle({ handle }).fetch();
      return result;
    }
    throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
  }
}
