import { pathToRegexp } from "path-to-regexp";

import { BadRequestException, Injectable } from "@nestjs/common";

import { fetchProblem } from "@proghours/crawler";

@Injectable()
export class ParserService {
  async parse(url: string) {
    try {
      const data = fetchProblem(url);
      return data;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  getUnifiedUrl(url: string) {
    const { hostname } = new URL(url);
    const transformers = this.getLinkTransformers();
    const linkTransformersMap = {
      "codeforces.com": transformers.codeforces,
      "www.codeforces.com": transformers.codeforces
    };
    if (!linkTransformersMap[hostname]) {
      return url;
    }
    return linkTransformersMap[hostname](url);
  }

  getLinkTransformers() {
    return {
      codeforces: (url: string) => {
        const _url = new URL(url);
        if (_url.hostname === "www.codeforces.com") {
          _url.hostname = "codeforces.com";
        }
        // convert problemset link to contest link
        const pattern = pathToRegexp(
          "https\\://codeforces.com/problemset/problem/:contestId/:problemId"
        );
        const match = pattern.exec(_url.toString());
        if (match) {
          match.shift();
          const [contestId, problemId] = match;
          return `https://codeforces.com/contest/${contestId}/problem/${problemId}`;
        }
        return _url.toString();
      },
      spoj: (url: string) => {
        const _url = new URL(url);
        if (_url.hostname === "spoj.com") {
          _url.hostname = "www.spoj.com";
        }
        return _url.toString();
      }
    };
  }
}
