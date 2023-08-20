import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { Prisma, Role } from "@prisma/client";

export type User = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  phone: null;
  role: Role;
  metaData: Prisma.JsonValue;
  createdAt: string;
};

export type GetUsersResponse = Array<User>;

export const getUsers = async (): Promise<GetUsersResponse> => {
  return axios.get("/users").then((res) => res.data);
};

type UseUsersOptions = {
  config?: UseQueryOptions<GetUsersResponse>;
};

export function useUsers({ config }: UseUsersOptions = {}) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    ...config
  });
}
