import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

export type KattisUrlParams = {
  type: "problemset_url";
  problemId: string;
};

const INVALID_PROBLEM_URL_ERROR = "Invalid Kattis problem URL";

export class KattisParser implements OJParser<KattisUrlParams> {
  // define valid URL patterns of a Kattis problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://open.kattis.com/problems/:problemId")
    }
  ] as const;

  getUrlParams(url: string): KattisUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of KattisParser.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      return {
        type: "problemset_url",
        problemId: match[1]
      };
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  async parse(url: string) {
    const { problemId } = this.getUrlParams(url);

    const { data } = await axios.get(url);
    const _ = cheerio.load(data);

    return {
      name: _(".book-page-heading").text().trim(),
      pid: "KT-" + problemId,
      difficulty: 0,
      url,
      tags: []
    };
  }
}
