import { fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import { useMemo, useState } from "react";
import useSWRInfinity, { SWRInfiniteConfiguration } from "swr/infinite";
export const useInfinityLoad = <T>(url: string, TAKE = 10, options?: SWRInfiniteConfiguration) => {
  const [data, setData] = useState<T[]>([]);
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${url}?take=${TAKE}&skip=${TAKE * pageIndex}`;
  };
  const {
    data: d,
    size,
    setSize,
    mutate,
  } = useSWRInfinity<T[]>(getKey, fetcher, {
    // revalidateOnMount: true,
    onSuccess(data, key, config) {
      const flatted = data ? data.flat() : [];
      setData(flatted);
    },
    ...options,
  });

  const invalidate = (obj: T) => {
    if (!d) return;
    const filtered = d.map((page) =>
      page.map((item) => {
        //@ts-ignore
        if (item?.id === obj?.id) {
          return obj;
        } else return item;
      })
    );
    mutate(filtered, {
      revalidate: false,
    });
  };
  const isReachedEnd = d && d[d.length - 1]?.length < TAKE;
  const isLoading = !d || typeof d[size - 1] === "undefined";
  return {
    data,
    isReachedEnd,
    isLoading,
    size,
    setSize,
    invalidate,
  };
};
