import { fetcher } from "@/lib/utils";
import { Follows, User } from "@prisma/client";
import useSWR from "swr";
export const useFollowing = () => {
  return useSWR<Follows[]>(`/api/user/follow`, fetcher, {
    revalidateOnFocus: false,
    // revalidateOnMount: false,
  });
};
