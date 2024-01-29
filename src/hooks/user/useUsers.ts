import { fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import useSWR from "swr";
export const useUsers = () => {
  const { data, error, isLoading } = useSWR<User[]>(`/api/user`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};
