export type ParseResult = {
  totalSolved: number;
  solvedProblems: Array<{
    pid: string;
    url: string;
    solvedAt: Date;
  }>;
};
