import { User } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type ActiveUserResponse = Omit<User, "password" | "metaData"> & {
  metaData: {
    department?: string;
    section?: string;
    batch?: number;
    cgpa?: number;
  };
};

const getActiveUser = async (): Promise<ActiveUserResponse> => {
  return axios.get("/users/me").then((res) => res.data);
};

type UseUserOptions = {
  config?: UseQueryOptions<ActiveUserResponse>;
};

export function useActiveUser({ config }: UseUserOptions = {}) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getActiveUser(),
    ...config
  });
}
