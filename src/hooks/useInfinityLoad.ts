import { fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import { useMemo } from "react";
import useSWRInfinity from "swr/infinite";
export const useInfinityLoad = <T>(url: string) => {
  const TAKE = 10;

  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${url}?take=${TAKE}&skip=${TAKE * pageIndex}`;
  };
  const { data: d, size, setSize } = useSWRInfinity<T[]>(getKey, fetcher);
  const data = useMemo(() => {
    return d?.flat() ?? [];
  }, [d]);
  const isReachedEnd = d && d[d.length - 1]?.length < TAKE;
  const isLoading = d && typeof d[size - 1] === "undefined";
  return {
    data,
    isReachedEnd,
    isLoading,
    size,
    setSize,
  };
};
