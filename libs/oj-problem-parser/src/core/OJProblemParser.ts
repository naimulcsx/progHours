import {
  AtCoderParser,
  CodechefParser,
  CodeforcesParser,
  CsesParser,
  HackerRankParser,
  LightOjParser,
  SpojParser,
  TimusParser,
  TophParser,
  UvaParser
} from "../parsers";
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

  // remove trailing slash from url
  private removeTrailingSlash(url: string) {
    return url.replace(/\/$/, "");
  }

  // remove www from url
  private removeWWWFromURL(url: string) {
    if (url.startsWith("https://www.")) {
      url = url.replace("https://www.", "https://");
    }
    return url;
  }

  async parse(url: string): Promise<ParseResult> {
    url = this.toHttps(url);
    url = this.removeTrailingSlash(url);
    url = this.removeWWWFromURL(url);

    if (!this.isValidLink(url)) {
      throw new Error(INVALID_URL_ERROR);
    }

    const { hostname } = new URL(url);

    // codeforces
    if (hostname.endsWith("codeforces.com")) {
      const parser = new CodeforcesParser();
      return parser.parse(url);
    }
    // codechef
    else if (hostname.endsWith("codechef.com")) {
      const parser = new CodechefParser();
      return parser.parse(url);
    }
    // cses
    else if (hostname.endsWith("cses.fi")) {
      const parser = new CsesParser();
      return parser.parse(url);
    }
    // toph
    else if (hostname.endsWith("toph.co")) {
      const parser = new TophParser();
      return parser.parse(url);
    }
    // spoj
    else if (hostname.endsWith("spoj.com")) {
      const parser = new SpojParser();
      return parser.parse(url);
    }
    // uva
    else if (hostname.endsWith("onlinejudge.org")) {
      const parser = new UvaParser();
      return parser.parse(url);
    }
    // atcoder
    else if (hostname.endsWith("atcoder.jp")) {
      const parser = new AtCoderParser();
      return parser.parse(url);
    }
    // lightoj
    else if (hostname.endsWith("lightoj.com")) {
      const parser = new LightOjParser();
      return parser.parse(url);
    }
    // hackerrank
    else if (hostname.endsWith("hackerrank.com")) {
      const parser = new HackerRankParser();
      return parser.parse(url);
    }
    // timus
    else if (hostname.endsWith("timus.ru")) {
      const parser = new TimusParser();
      return parser.parse(url);
    }

    throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
  }
}
