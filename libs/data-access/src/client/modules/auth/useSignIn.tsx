import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};

export const signIn = async (body: SignInPayload) => {
  return axios.post("/auth/sign-in", body).then((res) => res.data);
};

type UseSignInMutationOptions = {
  config?: UseMutationOptions<SignInResponse, unknown, SignInPayload>;
};

export const useSignInMutation = ({
  config
}: UseSignInMutationOptions = {}) => {
  return useMutation<SignInResponse, unknown, SignInPayload>({
    mutationFn: (values) => signIn(values),
    ...config
  });
};
