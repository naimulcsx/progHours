export type CodeforcesApiResponse = {
  status: string;
  result: Array<{
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: {
      contestId: number;
      index: string;
      name: string;
      type: string;
      points: number;
      rating: number;
      tags: Array<string>;
    };
    verdict: string;
    testset: string;
  }>;
};
