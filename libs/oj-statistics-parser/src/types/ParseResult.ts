export type ParseResult =
  | {
      judge: "OTHER";
      totalSolved: number;
      solvedProblems: Array<{
        pid: string;
        url: string;
        solvedAt: Date;
      }>;
    }
  | {
      judge: "CODEFORCES";
      totalSolved: number;
      solvedProblems: Array<{
        id: number;
        pid: string;
        name: string;
        url: string;
        contestId: number;
        difficulty: number;
        tags: string[];
        solvedAt: Date;
      }>;
    };
