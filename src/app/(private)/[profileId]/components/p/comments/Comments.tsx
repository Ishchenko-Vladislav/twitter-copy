"use client";
import { TComment } from "@/app/api/post/[postId]/comment/route";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Comment } from "./comment/Comment";
import { useParams } from "next/navigation";

interface Props {}

export const Comments: FC<Props> = () => {
  const params = useParams();
  const { data, setSize, size, isReachedEnd, invalidate } = useInfinityLoad<TComment>(
    `/api/post/${params.postId}/comment`
  );
  return (
    <InfiniteScroll
      className="flex-1 w-full pb-20"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
      endMessage={<div className="py-40"></div>}
    >
      {data && data.length > 0 ? (
        data.map((el) => <Comment invalidate={invalidate} key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto py-4 gap-2 px-4">
          <span className="text-muted-foreground text-base text-center">
            There are currently no comments
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};
