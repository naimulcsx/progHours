import {
  CcSubmissions,
  CfSubmissions,
  CodeChefCrawler,
  CodeforcesCrawler
} from "../crawlers";

const UNSUPPORTED_ONLINE_JUDGE_ERROR = "Unsupported Online Judge";

export type UserSubmissionsOptions = {
  handle: string;
  contestId?: string;
};

export async function fetchUserSubmissions<T extends "CODEFORCES" | "CODECHEF">(
  ...args: T extends "CODECHEF"
    ? [T, UserSubmissionsOptions & { clientId: string; secret: string }]
    : [T, UserSubmissionsOptions]
): Promise<T extends "CODEFORCES" ? CfSubmissions : CcSubmissions> {
  const [judge, options] = args;
  const { handle, contestId } = options;

  if (judge === "CODEFORCES") {
    const crawler = new CodeforcesCrawler();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return crawler.fetchUserSubmissions(handle, contestId) as any;
  }

  if (judge === "CODECHEF") {
    const crawler = new CodeChefCrawler();
    crawler.setApiKey({
      clientId: options.clientId,
      secret: options.secret
    });
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return crawler.fetchUserSubmissions(handle, contestId) as any;
  }

  throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
}
