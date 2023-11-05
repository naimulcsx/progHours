import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type LeaderboardType = "full" | "currentWeek" | "lastWeek";

export type LeaderboardEntry = {
  id: number;
  userId: string;
  fullName: string;
  username: string;
  metaData: {
    cgpa?: number;
    batch?: number;
    section?: string;
    department?: string;
  };
  totalSolveTime: number;
  totalDifficulty: number;
  totalSolved: number;
  totalSolvedWithDifficulty: number;
  points: number;
  averageDifficulty: number;
};

export type UseLeaderboardResponse = Array<LeaderboardEntry>;

export type UseLeaderboardOptions = {
  type: LeaderboardType;
  config?: UseQueryOptions<UseLeaderboardResponse>;
};

export async function getLeaderboard(
  type: LeaderboardType
): Promise<UseLeaderboardResponse> {
  return axios.get(`/leaderboard?type=${type}`).then((res) => res.data);
}

export function useLeaderboard(
  { type, config }: UseLeaderboardOptions = { config: {}, type: "full" }
) {
  console.log("from hook", type);
  return useQuery({
    queryKey: ["leaderboard", type],
    queryFn: () => getLeaderboard(type),
    ...config
  });
}
