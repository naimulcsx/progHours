import { Problem } from "@prisma/client";
import { axios } from "../../lib/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type RefetchProblemResponse = Problem;

export type RefetchProblemPayload = {
  id: number;
};

export const refetchProblem = async ({
  id
}: RefetchProblemPayload): Promise<RefetchProblemResponse> => {
  return axios.patch(`/problems/${id}/refetch`).then((res) => res.data);
};

type useRefetchProblemMutationOptions = {
  config?: UseMutationOptions<
    RefetchProblemResponse,
    unknown,
    RefetchProblemPayload
  >;
};

export const useRefetchProblemMutation = ({
  config
}: useRefetchProblemMutationOptions = {}) => {
  return useMutation({
    mutationFn: (values) => refetchProblem(values),
    ...config
  });
};
