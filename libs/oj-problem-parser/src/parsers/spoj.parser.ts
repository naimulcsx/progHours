import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";
import { OJParser } from "../core/OJParser";

export type SPOJUrlParams = {
  problemId: string;
};

export class SPOJParser extends OJParser<SPOJUrlParams> {
  getUrlParams(): SPOJUrlParams {
    const pattern = pathToRegexp("https\\://spoj.com/problems/:problemId");

    const match = pattern.exec(this.url);
    console.log({ pattern, match, url: this.url });
    if (!match) {
      throw new Error("Invalid Spoj link");
    }

    return {
      problemId: match[1]
    };
  }

  async parse() {
    const result = this.getUrlParams();
    const { data } = await axios.get(
      `https://www.spoj.com/problems/${result.problemId}`
    );
    const $ = cheerio.load(data);

    /**
     * Get problem name and link
     */
    const [problemCode, name] = $(".prob #problem-name")
      .text()
      .trim()
      .split(" - ");

    return {
      pid: `SPOJ-${problemCode}`,
      name,
      tags: [],
      difficulty: 0,
      judge_id: 6,
      url: `https://www.spoj.com/problems/${result.problemId}`
    };
  }
}
