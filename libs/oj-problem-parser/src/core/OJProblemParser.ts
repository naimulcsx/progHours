import { CodeforcesParser } from "../parsers/codeforces.parser";
import { ParseResult } from "../types/ParseResult";

export class OJProblemParser {
  isValidLink(link: string) {
    let url: URL;
    try {
      url = new URL(link);
    } catch {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  async parse(url: string): Promise<ParseResult> {
    if (!this.isValidLink(url)) throw new Error("Invalid URL");

    const { hostname } = new URL(url);

    if (hostname.endsWith("codeforces.com")) {
      const parser = new CodeforcesParser(url);
      return parser.parse();
    }

    throw new Error("Unknown online judge");
  }
}
