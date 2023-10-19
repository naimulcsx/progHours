import {
  CcSubmissions,
  CfSubmissions,
  CodeChefCrawler,
  CodeforcesCrawler
} from "../crawlers";

const UNSUPPORTED_ONLINE_JUDGE_ERROR = "Unsupported Online Judge";

export type FetchUserSubmissionsResult =
  | {
      judge: "CODEFORCES";
      data: CfSubmissions;
    }
  | {
      judge: "CODECHEF";
      data: CcSubmissions;
    };

export type FetchUserSubmissionQuery = {
  judge: "CODEFORCES" | "CODECHEF";
  handle: string;
  contestId?: string;
};

export type FetchUserSubmissionsOptions = {
  clientId?: string;
  secret?: string;
};

export async function fetchUserSubmissions(
  query: FetchUserSubmissionQuery,
  options: FetchUserSubmissionsOptions = {}
): Promise<FetchUserSubmissionsResult> {
  const { judge, handle, contestId } = query;

  // codeforces
  if (judge === "CODEFORCES") {
    const crawler = new CodeforcesCrawler();
    return {
      judge: "CODEFORCES",
      data: await crawler.fetchUserSubmissions(handle, contestId)
    };
  }

  // codechef
  if (judge === "CODECHEF") {
    const crawler = new CodeChefCrawler();

    if (options.clientId && options.secret) {
      crawler.setApiKey({
        clientId: options.clientId,
        secret: options.secret
      });
    }

    return {
      judge: "CODECHEF",
      data: await crawler.fetchUserSubmissions(handle, contestId)
    };
  }

  throw new Error(UNSUPPORTED_ONLINE_JUDGE_ERROR);
}
