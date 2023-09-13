import { HandleType } from "@prisma/client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type HandlesMutationPayload = {
  username: string;
  handles: Array<{
    type: HandleType;
    handle: string;
  }>;
};

export type HandlesMutationResponse = {
  accessToken: string;
};

export type UseHandlesMutationOptions = {
  config?: UseMutationOptions<
    HandlesMutationResponse,
    unknown,
    HandlesMutationPayload
  >;
};

async function updateUserHandles({
  username,
  ...body
}: HandlesMutationPayload): Promise<HandlesMutationResponse> {
  return axios
    .patch(`/users/${username}/handles`, body)
    .then((res) => res.data);
}

export function useHandlesMutation({ config }: UseHandlesMutationOptions = {}) {
  return useMutation({
    mutationFn: (body) => updateUserHandles(body),
    ...config
  });
}
