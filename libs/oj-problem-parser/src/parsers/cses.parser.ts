import { OJParser } from "../core/OJParser";
import { pathToRegexp } from "path-to-regexp";
import axios from "axios";
import * as cheerio from "cheerio";

export type CsesUrlParams = {
  problemId: string;
};

export class CsesParser extends OJParser<CsesUrlParams> {
  getUrlParams(): CsesUrlParams {
    const pattern = pathToRegexp(
      "https\\://cses.fi/problemset/task/:problemId"
    );
    const match = pattern.exec(this.url);
    if (!match) {
      throw new Error("Invalid CSES link");
    }
    return {
      problemId: match[1]
    };
  }
  async parse() {
    const result = this.getUrlParams();
    const { data } = await axios.get(
      `https://cses.fi/problemset/task/${result.problemId}`
    );
    const _ = cheerio.load(data);
    const name = _(".title-block h1").text().trim();
    if (!name) {
      throw new Error("Problem doesn't exist!");
    }
    return {
      pid: `CSES-${result.problemId}`,
      name,
      tags: [],
      difficulty: 0,
      url: `https://cses.fi/problemset/task/${result.problemId}`
    };
  }
}
