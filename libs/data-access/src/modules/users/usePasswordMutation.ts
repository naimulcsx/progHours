import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { axios } from "../../lib/axios";

export type PasswordMutationPayload = {
  username: string;
  currentPassword: string;
  newPassword: string;
};
export type PasswordMutationResponse = {
  accessToken: string;
};
export type UsePasswordMutationOptions = {
  config?: UseMutationOptions<
    PasswordMutationResponse,
    unknown,
    PasswordMutationPayload
  >;
};

async function updateUser({
  username,
  ...body
}: PasswordMutationPayload): Promise<PasswordMutationResponse> {
  return axios.patch(`/users/${username}`, body).then((res) => res.data);
}

export function usePasswordMutation({
  config
}: UsePasswordMutationOptions = {}) {
  return useMutation({
    mutationFn: (body) => updateUser(body),
    ...config
  });
}
