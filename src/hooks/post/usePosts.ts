import { fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import { useMemo } from "react";
import useSWRInfinity from "swr/infinite";
export const usePosts = () => {
  const take = 10;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/post?take=${take}&skip=${take * pageIndex}`;
  };
  const { data, size } = useSWRInfinity<User[]>(getKey, fetcher);
  const posts = useMemo(() => {
    return data?.flat();
  }, [data]);
  const isReachedEnd = data && data[data.length - 1]?.length < take;
  const loadingMore = data && typeof data[size - 1] === "undefined";
  return {
    posts,
  };
};
