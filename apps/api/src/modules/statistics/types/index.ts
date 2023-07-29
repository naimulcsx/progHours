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
  totalSolveTime: number;
  totalDifficulty: number;
  totalSolved: number;
  totalSolvedWithDifficulty: number;
};
