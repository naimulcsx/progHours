import { CodechefParser } from "../parsers/codechef.parser";
import { CodeforcesParser } from "../parsers/codeforces.parser";
import { ParseResult } from "../types/ParseResult";

const INVALID_URL_ERROR = "Invalid URL";
const UNSUPPORTED_ONLINE_JUDGE_ERROR = "Unsupported Online Judge";

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

  // convert non-https url to https
  private toHttps(url: string) {
    const _ = new URL(url);
    if (_.protocol === "http:") url = `https:` + url.substring(5);
    return url;
  }

  private removeTrailingSlash(url: string) {
    return url.replace(/\/$/, ""); // removing trailing slash
  }

  private removeWWWFromURL(url: string) {
    if (url.startsWith("https://www.")) {
      url = url.replace("https://www.", "https://");
    }
    return url;
  }

  async parse(url: string): Promise<ParseResult> {
    url = this.toHttps(url);
    url = this.removeTrailingSlash(url);

    if (!this.isValidLink(url)) {
      throw new Error(INVALID_URL_ERROR);
    }

    const { hostname } = new URL(url);

    if (hostname.endsWith("codeforces.com")) {
      const parser = new CodeforcesParser();
      return parser.parse(this.removeWWWFromURL(url));
    }

    if (hostname.endsWith("codechef.com")) {
      const parser = new CodechefParser();
      return parser.parse(url);
    }

    throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
  }
}
