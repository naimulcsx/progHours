import { Problem, ProblemTag, Submission, Tag } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UserSubmissionRow = Submission & {
  problem: Problem & {
    problemTags: Array<
      ProblemTag & {
        tag: Tag;
      }
    >;
  };
};

export type UserSubmissionsResponse = Array<UserSubmissionRow>;

export const getUserSubmissions = async (
  username: string
): Promise<UserSubmissionsResponse> => {
  return axios.get(`/profiles/${username}/submissions`).then((res) => res.data);
};

type UseUserSubmissionsOptions = {
  username: string;
  config?: UseQueryOptions<UserSubmissionsResponse>;
};

export function useUserSubmissions({
  username,
  config = {}
}: UseUserSubmissionsOptions) {
  return useQuery({
    queryKey: ["submissions", username],
    queryFn: () => getUserSubmissions(username),
    ...config
  });
}
