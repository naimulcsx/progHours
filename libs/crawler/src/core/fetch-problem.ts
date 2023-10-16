import {
  AtCoderCrawler,
  CodeChefCrawler,
  CodeToWinCrawler,
  CodeforcesCrawler,
  CsesCrawler,
  EolympCrawler,
  HackerRankCrawler,
  KattisCrawler,
  LeetCodeCrawler,
  LightOjCrawler,
  SpojCrawler,
  TimusCrawler,
  TophCrawler,
  UvaCrawler
} from "../crawlers";
import { ProblemData } from "../interfaces";

const UNSUPPORTED_ONLINE_JUDGE_ERROR = "Unsupported Online Judge";

export function fetchProblem(url: string): Promise<ProblemData> {
  const { hostname } = new URL(url);

  if (hostname.endsWith("codeforces.com")) {
    const parser = new CodeforcesCrawler();
    return parser.fetchProblem(url);
  }
  // codechef
  else if (hostname.endsWith("codechef.com")) {
    const parser = new CodeChefCrawler();
    return parser.fetchProblem(url);
  }
  // cses
  else if (hostname.endsWith("cses.fi")) {
    const parser = new CsesCrawler();
    return parser.fetchProblem(url);
  }
  // toph
  else if (hostname.endsWith("toph.co")) {
    const parser = new TophCrawler();
    return parser.fetchProblem(url);
  }
  // spoj
  else if (hostname.endsWith("spoj.com")) {
    const parser = new SpojCrawler();
    return parser.fetchProblem(url);
  }
  // uva
  else if (hostname.endsWith("onlinejudge.org")) {
    const parser = new UvaCrawler();
    return parser.fetchProblem(url);
  }
  // atcoder
  else if (hostname.endsWith("atcoder.jp")) {
    const parser = new AtCoderCrawler();
    return parser.fetchProblem(url);
  }
  // lightoj
  else if (hostname.endsWith("lightoj.com")) {
    const parser = new LightOjCrawler();
    return parser.fetchProblem(url);
  }
  // hackerrank
  else if (hostname.endsWith("hackerrank.com")) {
    const parser = new HackerRankCrawler();
    return parser.fetchProblem(url);
  }
  // timus
  else if (hostname.endsWith("timus.ru")) {
    const parser = new TimusCrawler();
    return parser.fetchProblem(url);
  }
  // leetcode
  else if (hostname.endsWith("leetcode.com")) {
    const parser = new LeetCodeCrawler();
    return parser.fetchProblem(url);
  }
  // codetowin
  else if (hostname.endsWith("codeto.win")) {
    const parser = new CodeToWinCrawler();
    return parser.fetchProblem(url);
  }
  // kattis
  else if (hostname.endsWith("open.kattis.com")) {
    const parser = new KattisCrawler();
    return parser.fetchProblem(url);
  }
  // eolymp
  else if (hostname.endsWith("eolymp.com")) {
    const parser = new EolympCrawler();
    return parser.fetchProblem(url);
  }

  throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
}
