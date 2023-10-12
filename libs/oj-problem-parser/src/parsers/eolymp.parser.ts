import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid Eolymp problem URL";

export type EolympUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class EolympParser implements OJParser<EolympUrlParams> {
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://eolymp.com/en/problems/:problemId")
    }
  ] as const;

  getUrlParams(url: string): EolympUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of EolympParser.urlPatterns) {
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

    const name = _(".eo-problem-statement h1.tw-heading").text().trim();

    return {
      pid: `Eolymp-${problemId}`,
      name,
      difficulty: 0,
      url,
      tags: []
    };
  }
}
