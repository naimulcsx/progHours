import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { User } from "@prisma/client";

export type SignUpPayload = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

export type SignUpResponse = Omit<User, "password">;

export const signUp = async (body: SignUpPayload) => {
  return axios.post("/auth/sign-up", body).then((res) => res.data);
};

type UseSignUpMutationOptions = {
  config?: UseMutationOptions<SignUpResponse, unknown, SignUpPayload>;
};

export const useSignUpMutation = ({
  config
}: UseSignUpMutationOptions = {}) => {
  return useMutation<SignUpResponse, unknown, SignUpPayload>({
    mutationFn: (values) => signUp(values),
    ...config
  });
};
