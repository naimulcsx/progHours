import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";

export type SignOutResponse = {
  accessToken: string;
};

export const signOut = async () => {
  return axios.post("/auth/sign-out").then((res) => res.data);
};

type UseSignOutMutationOptions = {
  config?: UseMutationOptions<SignOutResponse>;
};

export const useSignOutMutation = ({
  config
}: UseSignOutMutationOptions = {}) => {
  return useMutation<SignOutResponse>({
    mutationFn: () => signOut(),
    ...config
  });
};
