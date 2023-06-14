import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "../../lib/axios";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export const login = async (body: LoginPayload) => {
  return axios.post("/auth/sign-in", body).then((res) => res.data);
};

type UseLoginMutationOptions = {
  config?: UseMutationOptions<LoginResponse, unknown, LoginPayload>;
};

export const useLoginMutation = ({ config }: UseLoginMutationOptions = {}) => {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: (values) => login(values),
    ...config
  });
};
