import { fetcher } from "@/lib/utils";
import { Prisma, User } from "@prisma/client";
import useSWR from "swr";
export type UsersType = Prisma.UserGetPayload<{
  select: {
    id: true;
    avatar: true;
    name: true;
    username: true;
    _count: {
      select: {
        followers: true;
        following: true;
      };
    };
  };
}>;
export const useUsers = () => {
  const { data, error, isLoading } = useSWR<UsersType[]>(`/api/user`, fetcher, {
    refreshInterval: 8000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
};
