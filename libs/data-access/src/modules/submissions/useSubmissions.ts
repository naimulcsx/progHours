import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { Problem, ProblemTag, Submission, Tag } from "@prisma/client";

export type GetSubmissionsResponse = Array<
  Submission & {
    problem: Problem & {
      problemTags: Array<
        ProblemTag & {
          tag: Tag;
        }
      >;
    };
  }
>;

const getSubmissions = async (): Promise<GetSubmissionsResponse> => {
  return axios.get("/submissions").then((res) => res.data);
};

type UseSubmissionsOptions = {
  config?: UseQueryOptions<GetSubmissionsResponse>;
};

export function useSubmissions({ config }: UseSubmissionsOptions = {}) {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    ...config
  });
}
