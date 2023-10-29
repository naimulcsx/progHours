import { User } from "@prisma/client";
import {
  UseSuspenseQueryOptions,
  useSuspenseQuery
} from "@tanstack/react-query";

import { axios } from "../../../lib/axios";

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

export const getActiveUser = async (): Promise<ActiveUserResponse> => {
  return axios.get("/auth/me").then((res) => res.data);
};

type UseActiveUserQueryOptions = {
  config?: UseSuspenseQueryOptions<ActiveUserResponse>;
};

export function useActiveUserQuery({ config }: UseActiveUserQueryOptions = {}) {
  return useSuspenseQuery({
    queryKey: ["me"],
    queryFn: () => getActiveUser(),
    ...config
  });
}
