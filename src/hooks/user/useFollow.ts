// import { fetcher } from "@/lib/utils";
// import { User } from "@prisma/client";
// import useSWR from "swr";
// export const useUser = (id: string) => {
//   const { data, error, isLoading } = useSWR<User>(`/api/user/${id}`, fetcher);

import { useEffect, useState } from "react";
import { useFollowing } from "./useFollowing";
import { useSWRConfig, mutate as mm } from "swr";

//   return {
//     user: data,
//     isLoading,
//     isError: error,
//   };
// };
interface UseFollowOptions {
  withInvalidate: boolean;
  invalidateKey?: string;
  onSuccess?: (i: boolean) => void;
}
export const useFollow = (
  recipientId: string,
  { withInvalidate = true, invalidateKey, onSuccess }: UseFollowOptions
) => {
  const { data, mutate } = useFollowing();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(
    () => !!data?.find((el) => el.recipientId === recipientId)
  );
  useEffect(() => {
    setIsFollow(() => !!data?.find((el) => el.recipientId === recipientId));

    return () => {};
  }, [data]);
  const { mutate: invalidate } = useSWRConfig();

  const toggleFollow = async () => {
    // const isFollow = data?.find((el) => el.recipientId === recipientId);
    setIsLoading(true);
    try {
      if (isFollow) {
        const follow = await fetch("/api/user/follow", {
          method: "DELETE",
          body: JSON.stringify({ recipientId }),
        });
        mutate(
          (prev) => {
            return prev?.filter((el) => el.recipientId !== recipientId);
          },
          { revalidate: false }
        );
        if (onSuccess) {
          onSuccess(false);
        }
      } else {
        const follow = await fetch("/api/user/follow", {
          method: "POST",
          body: JSON.stringify({ recipientId }),
        }).then((res) => res.json());
        mutate(
          (prev) => {
            if (prev) {
              return [...prev, follow];
            }
            return [follow];
          },
          { revalidate: false }
        );
        if (onSuccess) {
          onSuccess(true);
        }
      }
      if (withInvalidate) {
        invalidate(invalidateKey);
        // invalidate(`/api/user/${recipientId}`);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      mm("/api/user");
    }
  };

  return {
    toggleFollow,
    isFollow,
    isLoading,
  };
};
