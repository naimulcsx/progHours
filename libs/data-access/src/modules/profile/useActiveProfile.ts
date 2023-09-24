import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";
import { UserProfileResponse } from "./useUserProfile";

export type ActiveProfileResponse = UserProfileResponse;

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
