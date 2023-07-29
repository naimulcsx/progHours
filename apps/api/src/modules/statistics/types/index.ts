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
