import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type ActiveProfileResponse = {
  userId: number;
  fullName: string;
  userName: string;
  metaData: {
    cgpa?: number;
    batch?: number;
    section?: string;
    department?: string;
  };
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

const getActiveProfile = async (): Promise<ActiveProfileResponse> => {
  return axios.get("/profiles/me").then((res) => res.data);
};

type UseActiveProifleOptions = {
  config?: UseQueryOptions<ActiveProfileResponse>;
};

export function useActiveProfile({ config }: UseActiveProifleOptions = {}) {
  return useQuery({
    queryKey: ["profiles", "me"],
    queryFn: () => getActiveProfile(),
    ...config
  });
}
