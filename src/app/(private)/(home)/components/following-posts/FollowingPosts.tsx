"use client";
import { Post, PostType } from "@/components/post/Post";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {}

export const FollowingPosts: FC<Props> = () => {
  const { data, setSize, size, isReachedEnd, isLoading, invalidate } =
    useInfinityLoad<PostType>("/api/post/following");

  return (
    <InfiniteScroll
      className="flex-1 w-full pb-20 max-w-[600px]"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      endMessage={<div className="py-40"></div>}
      dataLength={data.length ?? 0}
    >
      {data && data.length > 0 ? (
        data.map((el) => <Post invalidate={invalidate} key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4">
          <span className="text-xl font-semibold text-center">
            Here you can see the posts of people you are subscribed to
          </span>
          <span className="text-muted-foreground text-base text-center">
            There are currently no posts
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};
