import { pathToRegexp } from "path-to-regexp";
import { OJParser } from "../core/OJParser";
import axios from "axios";
import * as cheerio from "cheerio";

export type CfUrlParams =
  | {
      contestId: string;
      problemId: string;
    }
  | {
      groupId: string;
      contestId: string;
      problemId: string;
    };

export class CodeforcesParser extends OJParser<CfUrlParams> {
  getUrlParams(): CfUrlParams {
    const patterns = [
      {
        type: "contest_url",
        regexp: pathToRegexp(
          "https\\://codeforces.com/contest/:contestId/problem/:problemId"
        )
      },
      {
        type: "problemset_url",
        regexp: pathToRegexp(
          "https\\://codeforces.com/problemset/problem/:contestId/:problemId"
        )
      },
      {
        type: "gym_url",
        regexp: pathToRegexp(
          "https\\://codeforces.com/gym/:contestId/problem/:problemId"
        )
      },
      {
        type: "group_url",
        regexp: pathToRegexp(
          "https\\://codeforces.com/group/:groupId/contest/:contestId/problem/:problemId"
        )
      }
    ];
    for (const pattern of patterns) {
      const match = pattern.regexp.exec(this.url);
      if (!match) continue;

      if (
        pattern.type === "contest_url" ||
        pattern.type === "problemset_url" ||
        pattern.type === "gym_url"
      ) {
        return {
          contestId: match[1],
          problemId: match[2]
        };
      }

      if (pattern.type === "group_url") {
        return {
          groupId: match[1],
          contestId: match[2],
          problemId: match[3]
        };
      }
    }
    throw new Error("Invalid Codeforces URL");
  }

  getPid(result: CfUrlParams) {
    const { contestId, problemId } = result;
    if (this.url.includes("gym")) {
      return `Gym-${contestId}${problemId}`;
    } else {
      return `CF-${contestId}${problemId}`;
    }
  }

  async parse() {
    const result = this.getUrlParams();

    if ("groupId" in result) {
      const { data } = await axios.get(this.url);
      const _ = cheerio.load(data);

      const pid = this.getPid(result);
      const name = _("div.header > div.title")
        .text()
        .trim()
        .split(". ")
        .slice(1)
        .join("")
        .trim();
      const tags = [];
      let difficulty = 0;

      /**
       * The url matches the pattern, but the problem page does not exist
       */
      if (name.length === 0) {
        throw new Error("Invalid Codeforces URL");
      }

      /**
       * Group problems don't have tags. The iteration below will never likely to run.
       */
      _(".tag-box").each(function () {
        const tag = _(this).text().trim();
        if (tag.indexOf("*") === 0) {
          difficulty = Number(tag.slice(1)) || 0;
        } else {
          tags.push(tag);
        }
      });

      return {
        pid,
        name,
        difficulty,
        tags,
        url: this.url
      };
    } else {
      type Response = {
        result: {
          problems: Array<{
            name: string;
            index: string;
            tags: string[];
            points?: number;
            rating?: number;
          }>;
        };
      };

      try {
        const { data } = await axios.get<Response>(
          `https://codeforces.com/api/contest.standings?contestId=${result.contestId}&from=1&count=1`
        );

        // ? The API sends down HTML when API server is in maintainance or down
        if (typeof data === "string") {
          throw new Error("Codeforces API down");
        }

        for (const problem of data.result.problems) {
          if (problem.index === result.problemId) {
            console.log(problem);
            return {
              pid: this.getPid(result),
              name: problem.name,
              difficulty: problem.points ?? problem.rating ?? 0,
              tags: problem.tags,
              url: `https://codeforces.com/contest/${result.contestId}/problem/${result.problemId}`
            };
          }
        }

        throw new Error();
        /**
         * i.e Forcing to trigger the catch block, because the problem is not found in the response
         */
      } catch (err) {
        /**
         * Case 1: Valid pattern but wrong problemId, for example problem `Z` would less likely
         * to exist in Codeforces rounds. e.g https://codeforces.com/contest/1616/problem/Z
         * is a valid matching pattern but the problem doesn't exist.
         * ? The error is thrown by us
         *
         * Case 2: Valid pattern but wrong contestId, e.g https://codeforces.com/contest/16161/problem/Z
         * is a valid matching pattern but the contest doesn't exist.
         * ? This error is thrown by axios (400 Bad Request from API)
         *
         *
         * Case 3: Other axios errors
         * ? This error is thrown by axios
         */
        throw new Error("Invalid Codeforces problem");
      }
    }
  }
}
