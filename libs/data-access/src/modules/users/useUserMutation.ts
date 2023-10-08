import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UpdateUserPayload = {
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  metaData: {
    department?: string;
    section?: string;
    batch?: number;
    cgpa?: number;
    about?: string;
    skills?: string[];
  };
};
export type UpdateUserResponse = {
  accessToken: string;
};
export type UseUpdateUserOptions = {
  config?: UseMutationOptions<UpdateUserResponse, unknown, UpdateUserPayload>;
};

async function updateUser({
  username,
  ...body
}: UpdateUserPayload): Promise<UpdateUserResponse> {
  return axios.patch(`/users/${username}`, body).then((res) => res.data);
}

export function useUserMutation({ config }: UseUpdateUserOptions = {}) {
  return useMutation({
    mutationFn: (body) => updateUser(body),
    ...config
  });
}
