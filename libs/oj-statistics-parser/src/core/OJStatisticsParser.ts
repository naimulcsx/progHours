import { CodeforcesParser } from "../parsers/codeforces";
import { UserStatistics } from "./StatisticsParser";

export class OJStatisticsParser {
  async parse({
    judge,
    handle
  }: {
    judge: string;
    handle: string;
  }): Promise<UserStatistics> {
    if (judge === "codeforces") {
      const parser = new CodeforcesParser(handle);
      const result = await parser.fetch();
      return result;
    }
    throw new Error("Invalid online judge");
  }
}
