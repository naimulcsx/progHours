import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

type TrackerRetrieveResponse = {
  retrieveHistoryId: string;
};

export const retrieveSubmissions =
  async (): Promise<TrackerRetrieveResponse> => {
    return axios.post(`/tracker/retrieve`).then((res) => res.data);
  };

type useCreateSubmissionOptions = {
  config?: UseMutationOptions<TrackerRetrieveResponse>;
};

export const useRetrieve = ({ config }: useCreateSubmissionOptions = {}) => {
  return useMutation({
    mutationFn: () => retrieveSubmissions(),
    ...config
  });
};
