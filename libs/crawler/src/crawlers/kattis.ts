import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

export type KattisUrlParams = {
  type: "problemset_url";
  problemId: string;
};

const INVALID_PROBLEM_URL_ERROR = "Invalid Kattis problem URL";

export class KattisCrawler implements Crawler<KattisUrlParams> {
  // define valid URL patterns of a Kattis problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://open.kattis.com/problems/:problemId")
    }
  ] as const;

  getUrlParams(url: string): KattisUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of KattisCrawler.urlPatterns) {
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

  async fetchProblem(url: string) {
    url = unifyUrl(url);

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
