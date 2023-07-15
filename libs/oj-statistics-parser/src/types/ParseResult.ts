export type ParseResult =
  | {
      type: "partial";
      totalSolved: number;
      solvedProblems: Array<{
        pid: string;
        url: string;
        solvedAt: Date;
      }>;
    }
  | {
      type: "full";
      totalSolved: number;
      solvedProblems: Array<{
        pid: string;
        name: string;
        url: string;
        difficulty: number;
        tags: string[];
        solvedAt: Date;
      }>;
    };
