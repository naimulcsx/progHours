import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid HackerRank problem URL";

export type HackerRankUrlParams =
  | {
      type: "challenges_url";
      problemId: string;
    }
  | {
      type: "contest_url";
      contestId: string;
      problemId: string;
    };

export class HackerRankParser implements OJParser<HackerRankUrlParams> {
  static urlPatterns = [
    {
      type: "challenges_url",
      regexp: pathToRegexp(
        "https\\://hackerrank.com/challenges/:problemId/problem"
      )
    },
    {
      type: "contest_url",
      regexp: pathToRegexp(
        "https\\://hackerrank.com/contests/:contestId/challenges/:problemId"
      )
    }
  ] as const;

  formatUrl(url: string) {
    const _url = new URL(url);
    if (_url.searchParams.get("isFullScreen")) {
      _url.searchParams.delete("isFullScreen");
    }
    return _url.toString();
  }

  getUrlParams(url: string): HackerRankUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of HackerRankParser.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;

      if (pattern.type === "contest_url") {
        return {
          type: "contest_url",
          contestId: match[1],
          problemId: match[2]
        };
      } else if (pattern.type === "challenges_url") {
        return {
          type: "challenges_url",
          problemId: match[1]
        };
      }
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  async parse(url: string) {
    url = this.formatUrl(url);
    const { type, problemId } = this.getUrlParams(url);

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const _ = cheerio.load(data);

    let name: string;
    const pid = `HR-${problemId}`;

    if (type === "contest_url") {
      name = _('meta[property="og:title"]').attr("content");
    } else if (type === "challenges_url") {
      name = _(".challenge-page-label-wrapper .ui-icon-label.page-label")
        .text()
        .trim();
    }

    return {
      name,
      pid,
      tags: [],
      difficulty: 0,
      url
    };
  }
}
