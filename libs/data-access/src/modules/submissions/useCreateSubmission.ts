import { Submission } from "@prisma/client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { axios } from "../../lib/axios";

type CreateSubmissionPayload = {
  url: string;
  verdict: string;
  solveTime: number;
  solvedAt: Date;
};

type CreateSubmissionResponse = Submission;

export const createSubmission = async (
  body: CreateSubmissionPayload
): Promise<CreateSubmissionResponse> => {
  return axios.post(`/submissions`, body).then((res) => res.data);
};

type useCreateSubmissionOptions = {
  config?: UseMutationOptions<
    CreateSubmissionResponse,
    unknown,
    CreateSubmissionPayload
  >;
};

export const useCreateSubmission = ({
  config
}: useCreateSubmissionOptions = {}) => {
  return useMutation({
    mutationFn: (values) => createSubmission(values),
    ...config
  });
};
