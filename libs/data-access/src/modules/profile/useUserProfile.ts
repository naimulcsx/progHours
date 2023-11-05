import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UserProfileResponse = {
  userId: string;
  fullName: string;
  userName: string;
  rank: string;
  institution?: {
    id: number;
    name: string;
    url?: string;
    countryCode?: string;
    country?: string;
  };
  metaData: {
    cgpa?: number;
    batch?: number;
    section?: string;
    department?: string;
    about?: string;
    skills?: string[];
    website?: string;
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
    queryKey: ["profile", username],
    queryFn: () => getUserProfile(username),
    ...config
  });
}
