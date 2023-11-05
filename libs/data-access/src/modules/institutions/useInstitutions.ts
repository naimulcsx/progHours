import { Institution } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { axios } from "../../lib/axios";

export type UseInstitutionsResponse = Array<Institution>;

export type UseInstitutionsOptions = {
  config?: UseQueryOptions<UseInstitutionsResponse>;
};

export async function getInstitutions(): Promise<UseInstitutionsResponse> {
  return axios.get(`/institutions`).then((res) => res.data);
}

export function useInstitutions(
  { config }: UseInstitutionsOptions = { config: {} }
) {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: () => getInstitutions(),
    ...config
  });
}
