export type LeaderboardEntry = {
  userId: number;
  fullName: string;
  username: string;
  metaData: {
    department?: string;
    section?: string;
    batch?: number;
    cgpa?: number;
  };
  totalSolveTime: bigint;
  totalDifficulty: bigint;
  totalSolved: bigint;
  totalSolvedWithDifficulty: bigint;
};

export type UserStatistics = {
  totalSolveTime: bigint;
  totalDifficulty: bigint;
  totalSolved: bigint;
  totalSolvedWithDifficulty: bigint;
};

export type TagsFrequency = Array<{
  name: string;
  count: number;
}>;

export type WeeklyStatisticsRow = {
  weekStartDate: Date;
  solved: number;
  averageDifficulty: number;
};

export type WeeklyStatistics = Array<WeeklyStatisticsRow>;
