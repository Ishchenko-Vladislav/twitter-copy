import { fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import useSWR from "swr";
export const useUser = (id: string) => {
  const { data, error, isLoading } = useSWR<
    User & {
      followingCount: number;
      followersCount: number;
    }
  >(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
