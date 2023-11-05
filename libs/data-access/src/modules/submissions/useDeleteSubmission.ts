import { Submission } from "@prisma/client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

type DeleteSubmissionPayload = {
  id: string;
};

type DeleteSubmissionResponse = Submission;

export const deleteSubmission = async ({
  id
}: DeleteSubmissionPayload): Promise<DeleteSubmissionResponse> => {
  return axios.delete(`/submissions/${id}`).then((res) => res.data);
};

type useDeleteSubmissionOptions = {
  config?: UseMutationOptions<
    DeleteSubmissionResponse,
    unknown,
    DeleteSubmissionPayload
  >;
};

export const useDeleteSubmission = ({
  config
}: useDeleteSubmissionOptions = {}) => {
  return useMutation({
    mutationFn: (values) => deleteSubmission(values),
    ...config
  });
};
