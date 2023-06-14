import { CodechefParser } from "../parsers/codechef.parser";
import { CodeforcesParser } from "../parsers/codeforces.parser";
import { CsesParser } from "../parsers/cses.parser";
import { ParseResult } from "../types/ParseResult";

export class OJProblemParser {
  private isValidLink(link: string) {
    let url: URL;
    try {
      url = new URL(link);
    } catch {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  private formatLink(url: string) {
    const _ = new URL(url);
    if (_.protocol === "http:") url = `https:` + url.substring(5);
    return url.replace(/\/$/, "");
  }

  private removeWWWFromURL(url: string) {
    if (url.startsWith("https://www.")) {
      url = url.replace("https://www.", "https://");
    }
    return url;
  }

  async parse(url: string): Promise<ParseResult> {
    url = this.formatLink(url);

    if (!this.isValidLink(url)) {
      throw new Error("Invalid URL");
    }

    const { hostname } = new URL(url);

    if (hostname.endsWith("codeforces.com")) {
      const parser = new CodeforcesParser(this.removeWWWFromURL(url));
      return parser.parse();
    }

    if (hostname.endsWith("codechef.com")) {
      const parser = new CodechefParser(this.removeWWWFromURL(url));
      return parser.parse();
    }

    if (hostname.endsWith("cses.fi")) {
      const parser = new CsesParser(this.removeWWWFromURL(url));
      return parser.parse();
    }

    throw new Error("Unknown online judge");
  }
}
