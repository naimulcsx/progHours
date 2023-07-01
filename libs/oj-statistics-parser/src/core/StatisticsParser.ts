export type UserStatistics = {
  totalSolved: number;
  solvedProblems: Array<{
    pid: string;
    url: string;
    solvedAt: Date;
  }>;
};

export abstract class StatisticsParser {
  public handle: string;
  constructor(handle: string) {
    this.handle = handle;
  }
  abstract fetch(): Promise<UserStatistics>;
}
