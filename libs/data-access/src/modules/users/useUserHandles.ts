import { UserHandle } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UserHandlesResponse = Array<{
  type: UserHandle;
  handle: string;
}>;

const getUserHandles = async (
  username: string
): Promise<UserHandlesResponse> => {
  return axios.get(`/users/${username}/handles`).then((res) => res.data);
};

type UseUserHandlesOptions = {
  username: string;
  config?: UseQueryOptions<UserHandlesResponse>;
};

export function useUserHandles({
  config = {},
  username
}: UseUserHandlesOptions) {
  return useQuery({
    queryKey: ["handles"],
    queryFn: () => getUserHandles(username),
    ...config
  });
}
