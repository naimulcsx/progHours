import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { User } from "@prisma/client";

export type ActiveUserResponse = Omit<User, "password">;

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
