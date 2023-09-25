import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UserProfileResponse = {
  userId: number;
  fullName: string;
  userName: string;
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
  solveCountByTags: Array<{
    tag: string;
    count: number;
  }>;
  solveTimeByTags: Array<{
    tag: string;
    sum: number;
  }>;
  weeklyStatistics: Array<{
    weekStartDate: string;
    solved: number;
    averageDifficulty: number;
    weekNumber: number;
    label: string;
  }>;
};

const getUserProfile = async (
  username: string
): Promise<UserProfileResponse> => {
  return axios.get(`/profiles/${username}`).then((res) => res.data);
};

type UseActiveProifleOptions = {
  username: string;
  config?: UseQueryOptions<UserProfileResponse>;
};

export function useUserProfile({
  username,
  config = {}
}: UseActiveProifleOptions) {
  return useQuery({
    queryKey: ["profiles", username],
    queryFn: () => getUserProfile(username),
    ...config
  });
}
