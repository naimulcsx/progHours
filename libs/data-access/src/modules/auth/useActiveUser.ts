import { User } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type ActiveUserResponse = Omit<User, "password" | "metaData"> & {
  metaData: {
    department?: string;
    section?: string;
    batch?: number;
    cgpa?: number;
    about?: string;
    website?: string;
    skills?: string[];
  };
};

const getActiveUser = async (): Promise<ActiveUserResponse> => {
  return axios.get("/auth/me").then((res) => res.data);
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
