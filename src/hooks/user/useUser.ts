import { fetcher } from "@/lib/utils";
import { Prisma, User } from "@prisma/client";
import useSWR from "swr";

export type UserType = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        followers: true;
        following: true;
      };
    };
  };
  // include: {
  //   user: true;
  //   attachments: true;
  //   _count: {
  //     select: {
  //       comments: true;
  //       likes: true;
  //       bookmarks: true;
  //     };
  //   };
  // };
}>;

export const useUser = (id: string) => {
  const { data, error, isLoading } = useSWR<UserType>(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
