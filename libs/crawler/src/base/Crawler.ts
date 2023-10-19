import { ProblemData } from "../interfaces";

export abstract class Crawler<TUrlParams> {
  abstract getUrlParams(url: string): TUrlParams;
  abstract fetchProblem(url: string): Promise<ProblemData>;
}

export abstract class ExtendedCrawler<TData> {
  abstract fetchUserSubmissions(
    handle: string,
    contestId?: string
  ): Promise<TData>;
}
