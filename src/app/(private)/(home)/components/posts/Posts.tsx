"use client";
import { Post, PostType } from "@/components/post/Post";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { Post as P } from "@prisma/client";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
interface Props {}

export const Posts: FC<Props> = () => {
  const { data, setSize, size, isReachedEnd } = useInfinityLoad<PostType>("/api/post");
  console.log("POST", data);
  return (
    <InfiniteScroll
      className="flex-1 w-full"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
    >
      {data && data.length > 0 ? data.map((el) => <Post key={el.id} {...el} />) : null}
    </InfiniteScroll>
  );
};
