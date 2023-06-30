import { Submission, Verdict } from "@prisma/client";
import { axios } from "../../lib/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type UpdateSubmissionResponse = Submission;

export type UpdateSubmissionPayload = {
  id: number;
  solveTime?: number;
  verdict?: Verdict;
  solvedAt?: Date;
};

export const updateSubmission = async ({
  id,
  ...body
}: UpdateSubmissionPayload): Promise<UpdateSubmissionResponse> => {
  return axios.patch(`/submissions/${id}`, body).then((res) => res.data);
};

type UseUpdateSubmissionMutationOptions = {
  config?: UseMutationOptions<
    UpdateSubmissionResponse,
    unknown,
    UpdateSubmissionPayload
  >;
};

export const useUpdateSubmissionMutation = ({
  config
}: UseUpdateSubmissionMutationOptions = {}) => {
  return useMutation({
    mutationFn: (values) => updateSubmission(values),
    ...config
  });
};
